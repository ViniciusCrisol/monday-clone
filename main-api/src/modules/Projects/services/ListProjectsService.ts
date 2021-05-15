import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import Project from '../infra/typeorm/entities/Project';
import IProjectsRepository from '../repositories/IProjectsRepository';
import IAccountsRepository from '@modules/Accounts/repositories/IAccountsRepository';

@injectable()
class ListProjects {
  constructor(
    @inject('AccountsRepository')
    private accountsRepository: IAccountsRepository,

    @inject('ProjectsRepository')
    private projectsRepository: IProjectsRepository,
  ) {}

  public async execute(account_id: string): Promise<Project[]> {
    const account = await this.accountsRepository.findById(account_id);
    if (!account) throw new AppError('invalidAccount');

    const projects = await this.projectsRepository.findAll(account_id);
    return projects;
  }
}

export default ListProjects;
