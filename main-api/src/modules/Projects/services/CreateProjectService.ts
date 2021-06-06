import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import Project from '@modules/Projects/infra/typeorm/entities/Project';
import AccountsRepository from '@modules/Accounts/infra/typeorm/repositories/AccountsRepository';
import MembersRepository from '@modules/Members/infra/typeorm/repositories/MembersRepository';
import ProjectsRepository from '@modules/Projects/infra/typeorm/repositories/ProjectsRepository';

interface IRequest {
  project_name: string;
  account_id: string;
}

@injectable()
export default class CreateProjectService {
  constructor(
    @inject('AccountsRepository')
    private accountsRepository: AccountsRepository,

    @inject('MembersRepository')
    private membersRepository: MembersRepository,

    @inject('ProjectsRepository')
    private projectsRepository: ProjectsRepository,
  ) {}

  public async execute({
    project_name,
    account_id,
  }: IRequest): Promise<Project> {
    const [account, checkProjectExits, ownProjectsCount, memberProjectsCount] =
      await Promise.all([
        this.accountsRepository.findById(account_id),
        this.projectsRepository.findByName({ account_id, project_name }),
        this.projectsRepository.countByAccountId(account_id),
        this.membersRepository.countProjectsByAccountId(account_id),
      ]);

    if (!account) throw new AppError('invalidAccount');
    if (checkProjectExits) throw new AppError('nameAlreadyInUse');
    if (ownProjectsCount + memberProjectsCount >= 30)
      throw new AppError('maxNumberOfProjects');

    const project = await this.projectsRepository.create({
      project_name,
      account_id,
    });

    return project;
  }
}
