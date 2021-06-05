import { inject, injectable } from 'tsyringe';

import memberRoles from '@utils/enums/memberRoles';
import AppError from '@shared/errors/AppError';
import Group from '@modules/Groups/infra/typeorm/entities/Group';
import GroupsRepository from '@modules/Groups/infra/typeorm/repositories/GroupsRepository';
import MembersRepository from '@modules/Members/infra/typeorm/repositories/MembersRepository';
import AccountsRepository from '@modules/Accounts/infra/typeorm/repositories/AccountsRepository';
import ProjectsRepository from '@modules/Projects/infra/typeorm/repositories/ProjectsRepository';
import MemberGroupsRepository from '@modules/MemberGroups/infra/typeorm/repositories/MemberGroupsRepository';

interface IRequest {
  account_id: string;
  project_id: string;
  group_name: string;
}

@injectable()
export default class CreateGroupService {
  constructor(
    @inject('AccountsRepository')
    private accountsRepository: AccountsRepository,

    @inject('ProjectsRepository')
    private projectsRepository: ProjectsRepository,

    @inject('MembersRepository')
    private membersRepository: MembersRepository,

    @inject('GroupsRepository')
    private groupsRepository: GroupsRepository,

    @inject('MemberGroupsRepository')
    private memberGroupsRepository: MemberGroupsRepository,
  ) {}

  public async execute({
    account_id,
    project_id,
    group_name,
  }: IRequest): Promise<Group> {
    const [account, project, groupNameAlreadyInuse] = await Promise.all([
      this.accountsRepository.findById(account_id),
      this.projectsRepository.findById(project_id),
      this.groupsRepository.findByName(group_name),
    ]);

    if (!account) throw new AppError('invalidAccount');
    if (!project) throw new AppError('projectNotFounded');

    if (project.account_id !== account.id) {
      const accountMemberProject =
        await this.membersRepository.findByAccountAndProjectId({
          account_id,
          project_id,
        });

      if (
        !accountMemberProject ||
        accountMemberProject.role !== memberRoles.PROJECT_LEADER
      )
        throw new AppError('notAllowed');
    }

    if (!groupNameAlreadyInuse) throw new AppError('nameAlreadyInUse');

    const group = await this.groupsRepository.create({
      group_name,
      project_id,
      leader_id: project.account_id,
    });

    const projectLeaders = await this.membersRepository.listByRoleAndProjectId({
      project_id,
      role: memberRoles.PROJECT_LEADER,
    });

    const defaultGroupMembers = projectLeaders.map(projectLeader => {
      return this.memberGroupsRepository.create({
        group_id: group.id,
        member_id: projectLeader.id,
      });
    });

    defaultGroupMembers.push(
      this.memberGroupsRepository.create({
        group_id: group.id,
        member_id: project.account_id,
      }),
    );
    await Promise.all(defaultGroupMembers);
    return group;
  }
}
