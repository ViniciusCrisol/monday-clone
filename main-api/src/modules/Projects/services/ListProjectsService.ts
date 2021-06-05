import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import Project from '@modules/Projects/infra/typeorm/entities/Project';
import MembersRepository from '@modules/Members/infra/typeorm/repositories/MembersRepository';
import ProjectsRepository from '@modules/Projects/infra/typeorm/repositories/ProjectsRepository';
import AccountsRepository from '@modules/Accounts/infra/typeorm/repositories/AccountsRepository';

@injectable()
export default class ListProjectsService {
  constructor(
    @inject('AccountsRepository')
    private accountsRepository: AccountsRepository,

    @inject('ProjectsRepository')
    private projectsRepository: ProjectsRepository,

    @inject('MembersRepository')
    private membersRepository: MembersRepository,
  ) {}

  public async execute(account_id: string): Promise<Project[]> {
    const account = await this.accountsRepository.findById(account_id);
    if (!account) throw new AppError('invalidAccount');

    const [ownProjects, meberProjects] = await Promise.all([
      this.projectsRepository.list(account_id),
      this.membersRepository.listProjectsByAccountId(account_id),
    ]);

    return [...ownProjects, ...meberProjects];
  }
}
