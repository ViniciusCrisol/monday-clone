import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import Project from '../infra/typeorm/entities/Project';
import IProjectsRepository from '../repositories/IProjectsRepository';
import IAccountsRepository from '@modules/Accounts/repositories/IAccountsRepository';
import IMembersRepository from '@modules/Members/repositories/IMembersRepository';

@injectable()
class ListProjects {
  constructor(
    @inject('AccountsRepository')
    private accountsRepository: IAccountsRepository,

    @inject('ProjectsRepository')
    private projectsRepository: IProjectsRepository,

    @inject('MembersRepository')
    private membersRepository: IMembersRepository,
  ) {}

  public async execute(account_id: string): Promise<Project[]> {
    const account = await this.accountsRepository.findById(account_id);
    if (!account) throw new AppError('invalidAccount');

    const ownProjects = await this.projectsRepository.findAll(account_id);
    const meberProjects = await this.membersRepository.findProjects(account_id);

    const projects = [...ownProjects, ...meberProjects];
    return projects;
  }
}

export default ListProjects;
