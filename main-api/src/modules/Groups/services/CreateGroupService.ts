import { inject, injectable } from 'tsyringe';

import memberRoles from '@utils/enums/memberRoles';
import AppError from '@shared/errors/AppError';
import Group from '@modules/Groups/infra/typeorm/entities/Group';
import AccountsRepository from '@modules/Accounts/infra/typeorm/repositories/AccountsRepository';
import GroupsRepository from '@modules/Groups/infra/typeorm/repositories/GroupsRepository';
import MemberGroupsRepository from '@modules/MemberGroups/infra/typeorm/repositories/MemberGroupsRepository';
import MembersRepository from '@modules/Members/infra/typeorm/repositories/MembersRepository';
import ProjectsRepository from '@modules/Projects/infra/typeorm/repositories/ProjectsRepository';

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

    @inject('GroupsRepository')
    private groupsRepository: GroupsRepository,

    @inject('MemberGroupsRepository')
    private memberGroupsRepository: MemberGroupsRepository,

    @inject('MembersRepository')
    private membersRepository: MembersRepository,

    @inject('ProjectsRepository')
    private projectsRepository: ProjectsRepository,
  ) {}

  public async execute({
    account_id,
    project_id,
    group_name,
  }: IRequest): Promise<Group> {
    const [account, project, groupNameAlreadyInUse, accountMemberProject] =
      await Promise.all([
        this.accountsRepository.findById(account_id),
        this.projectsRepository.findById(project_id),
        this.groupsRepository.findByName({ group_name, project_id }),
        this.membersRepository.findByAccountAndProjectId({
          account_id,
          project_id,
        }),
      ]);

    if (!account) throw new AppError('invalidAccount');
    if (!project) throw new AppError('projectNotFounded');
    if (groupNameAlreadyInUse) throw new AppError('nameAlreadyInUse');
    if (
      project.account_id !== account.id &&
      (!accountMemberProject ||
        accountMemberProject.role !== memberRoles.PROJECT_LEADER)
    )
      throw new AppError('notAllowed');

    const [group, projectLeaders] = await Promise.all([
      this.groupsRepository.create({
        group_name,
        project_id,
      }),
      this.membersRepository.listByRoleAndProjectId({
        project_id,
        role: memberRoles.PROJECT_LEADER,
      }),
    ]);

    await Promise.all(
      projectLeaders.map(projectLeader =>
        this.memberGroupsRepository.create({
          group_id: group.id,
          member_id: projectLeader.id,
        }),
      ),
    );

    return group;
  }
}
