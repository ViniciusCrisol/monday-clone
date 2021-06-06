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
export default class GetProjectService {
  constructor(
    @inject('AccountsRepository')
    private accountsRepository: AccountsRepository,

    @inject('ProjectsRepository')
    private projectsRepository: ProjectsRepository,

    @inject('MembersRepository')
    private membersRepository: MembersRepository,
  ) {}

  public async execute({ project_id, account_id }: IRequest): Promise<Project> {
    const [account, project, members] = await Promise.all([
      this.accountsRepository.findById(account_id),
      this.projectsRepository.findById(project_id),
      this.membersRepository.listByProjectId(project_id),
    ]);

    if (!account) throw new AppError('invalidAccount');
    if (!project) throw new AppError('invalidProject');

    const member = members.find(member => member.account_id === account_id);
    if (!member && project.account_id !== account_id)
      throw new AppError('notAllowed');

    project.members = members;
    return project;
  }
}
