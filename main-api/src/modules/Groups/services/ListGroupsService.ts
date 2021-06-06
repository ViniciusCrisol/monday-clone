import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import Group from '@modules/Groups/infra/typeorm/entities/Group';
import GroupsRepository from '@modules/Groups/infra/typeorm/repositories/GroupsRepository';
import MembersRepository from '@modules/Members/infra/typeorm/repositories/MembersRepository';
import AccountsRepository from '@modules/Accounts/infra/typeorm/repositories/AccountsRepository';
import ProjectsRepository from '@modules/Projects/infra/typeorm/repositories/ProjectsRepository';

interface IRequest {
  account_id: string;
  project_id: string;
}

@injectable()
export default class ListGroupsService {
  constructor(
    @inject('GroupsRepository')
    private groupsRepository: GroupsRepository,

    @inject('ProjectsRepository')
    private projectsRepository: ProjectsRepository,

    @inject('MembersRepository')
    private membersRepository: MembersRepository,

    @inject('AccountsRepository')
    private accountsRepository: AccountsRepository,
  ) {}

  public async execute({ account_id, project_id }: IRequest): Promise<Group[]> {
    const [groups, account, project, accountMemberProject] = await Promise.all([
      this.groupsRepository.list(project_id),
      this.accountsRepository.findById(account_id),
      this.projectsRepository.findById(project_id),
      this.membersRepository.findByAccountAndProjectId({
        account_id,
        project_id,
      }),
    ]);

    if (!account) throw new AppError('invalidAccount');
    if (!project) throw new AppError('projectNotFounded');
    if (project.account_id !== account.id && !accountMemberProject)
      throw new AppError('notAllowed');

    return groups;
  }
}
