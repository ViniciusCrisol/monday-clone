import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import Project from '../infra/typeorm/entities/Project';
import IProjectsRepository from '../repositories/IProjectsRepository';
import IAccountsRepository from '@modules/Accounts/repositories/IAccountsRepository';
import IMembersRepository from '@modules/Members/repositories/IMembersRepository';

interface IRequest {
  project_id: string;
  account_id: string;
}

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

  public async execute({ project_id, account_id }: IRequest): Promise<Project> {
    const account = await this.accountsRepository.findById(account_id);
    if (!account) throw new AppError('invalidAccount');

    const project = await this.projectsRepository.findById(project_id);
    if (!project) throw new AppError('invalidProject');

    return project;
  }
}

export default ListProjects;
