import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import Project from '@modules/Projects/infra/typeorm/entities/Project';
import AccountsRepository from '@modules/Accounts/infra/typeorm/repositories/AccountsRepository';
import MembersRepository from '@modules/Members/infra/typeorm/repositories/MembersRepository';
import ProjectsRepository from '@modules/Projects/infra/typeorm/repositories/ProjectsRepository';

@injectable()
export default class ListProjectsService {
  constructor(
    @inject('AccountsRepository')
    private accountsRepository: AccountsRepository,

    @inject('MembersRepository')
    private membersRepository: MembersRepository,

    @inject('ProjectsRepository')
    private projectsRepository: ProjectsRepository,
  ) {}

  public async execute(account_id: string): Promise<Project[]> {
    const [account, ownProjects, meberProjects] = await Promise.all([
      this.accountsRepository.findById(account_id),
      this.projectsRepository.list(account_id),
      this.membersRepository.listProjectsByAccountId(account_id),
    ]);

    if (!account) throw new AppError('invalidAccount');

    return [...ownProjects, ...meberProjects];
  }
}
