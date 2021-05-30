import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import Project from '@modules/Projects/infra/typeorm/entities/Project';
import MembersRepository from '@modules/Members/infra/typeorm/repositories/MembersRepository';
import ProjectsRepository from '@modules/Projects/infra/typeorm/repositories/ProjectsRepository';
import AccountsRepository from '@modules/Accounts/infra/typeorm/repositories/AccountsRepository';

interface IRequest {
  project_id: string;
  account_id: string;
}

@injectable()
class ListProjects {
  constructor(
    @inject('MembersRepository')
    private membersRepository: MembersRepository,

    @inject('ProjectsRepository')
    private projectsRepository: ProjectsRepository,

    @inject('AccountsRepository')
    private accountsRepository: AccountsRepository,
  ) {}

  public async execute({ project_id, account_id }: IRequest): Promise<Project> {
    const account = await this.accountsRepository.findById(account_id);
    if (!account) throw new AppError('invalidAccount');

    const project = await this.projectsRepository.findById(project_id);
    if (!project) throw new AppError('invalidProject');

    const members = await this.membersRepository.listByProjectId(project_id);
    const member = members.find(member => member.account_id === account_id);
    if (!member && project.account_id !== account_id)
      throw new AppError('permissionDenied');

    project.members = members;

    return project;
  }
}

export default ListProjects;
