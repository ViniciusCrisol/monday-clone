import { injectable, inject } from 'tsyringe';
import { nameAlreadyInUse } from '@shared/errors/messages';

import AppError from '@shared/errors/AppError';
import Project from '../infra/typeorm/entities/Project';
import IProjectsRepository from '../repositories/IProjectsRepository';

interface IRequest {
  project_name: string;
  account_id: string;
}

@injectable()
class CreateProjectService {
  constructor(
    @inject('ProjectsRepository')
    private projectsRepository: IProjectsRepository,
  ) {}

  public async execute({
    project_name,
    account_id,
  }: IRequest): Promise<Project> {
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
