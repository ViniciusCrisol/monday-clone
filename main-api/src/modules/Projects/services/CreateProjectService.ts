import { inject, injectable } from 'tsyringe';

import { invalidAccount, nameAlreadyInUse } from '@shared/errors/messages';
import AppError from '@shared/errors/AppError';
import Project from '../infra/typeorm/entities/Project';
import IProjectsRepository from '../repositories/IProjectsRepository';
import IAccountsRepository from '@modules/Accounts/repositories/IAccountsRepository';

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
  ) {}

  public async execute({
    project_name,
    account_id,
  }: IRequest): Promise<Project> {
    const checkAccountExists = await this.accountsRepository.findById(
      account_id,
    );
    if (!checkAccountExists) {
      throw new AppError(invalidAccount.message);
    }

    const checkProjectExits = await this.projectsRepository.findByNameAndAccountId(
      { account_id, project_name },
    );
    if (checkProjectExits) {
      throw new AppError(nameAlreadyInUse.message);
    }

    const project = await this.projectsRepository.create({
      project_name,
      account_id,
    });

    return project;
  }
}

export default CreateProjectService;
