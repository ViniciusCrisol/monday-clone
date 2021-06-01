import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import Project from '@modules/Projects/infra/typeorm/entities/Project';
import MembersRepository from '@modules/Members/infra/typeorm/repositories/MembersRepository';
import ProjectsRepository from '@modules/Projects/infra/typeorm/repositories/ProjectsRepository';
import AccountsRepository from '@modules/Accounts/infra/typeorm/repositories/AccountsRepository';

@injectable()
export default class ListProjects {
  constructor(
    @inject('MembersRepository')
    private membersRepository: MembersRepository,

    @inject('ProjectsRepository')
    private projectsRepository: ProjectsRepository,

    @inject('AccountsRepository')
    private accountsRepository: AccountsRepository,
  ) {}

  public async execute(account_id: string): Promise<Project[]> {
    const account = await this.accountsRepository.findById(account_id);
    if (!account) throw new AppError('invalidAccount');

    const [ownProjects, meberProjects] = await Promise.all([
      this.projectsRepository.findAll(account_id),
      this.membersRepository.findProjects(account_id),
    ]);

    return [...ownProjects, ...meberProjects];
  }
}
