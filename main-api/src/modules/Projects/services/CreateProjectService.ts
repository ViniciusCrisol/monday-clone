import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import Project from '../infra/typeorm/entities/Project';
import IProjectsRepository from '../repositories/IProjectsRepository';
import IAccountsRepository from '@modules/Accounts/repositories/IAccountsRepository';
import IMembersRepository from '@modules/Members/repositories/IMembersRepository';

interface IRequest {
  project_name: string;
  account_id: string;
}

@injectable()
class CreateProjectService {
  constructor(
    @inject('ProjectsRepository')
    private projectsRepository: IProjectsRepository,

    @inject('AccountsRepository')
    private accountsRepository: IAccountsRepository,

    @inject('MembersRepository')
    private membersRepository: IMembersRepository,
  ) {}

  public async execute({
    project_name,
    account_id,
  }: IRequest): Promise<Project> {
    const account = await this.accountsRepository.findById(account_id);
    if (!account) throw new AppError('invalidAccount');

    const checkProjectExits = await this.projectsRepository.findByName({
      account_id,
      project_name,
    });
    if (checkProjectExits) throw new AppError('nameAlreadyInUse');

    const ownProjectsCount = await this.projectsRepository.count(account_id);
    const memberProjectsCount = await this.membersRepository.count(account_id);

    const projectsCount = ownProjectsCount + memberProjectsCount;
    if (projectsCount >= 30) throw new AppError('maxNumberOfProjects');

    const project = await this.projectsRepository.create({
      project_name,
      account_id,
    });

    return project;
  }
}

export default CreateProjectService;
