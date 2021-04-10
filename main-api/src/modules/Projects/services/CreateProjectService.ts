import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import { nameAlreadyInUse } from '@shared/errors/messages';

import IProjectsRepository from '../repositories/IProjectsRepository';
import Project from '../infra/typeorm/entities/Project';

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
    const project = await this.projectsRepository.create({
      project_name,
      account_id,
    });

    return project;
  }
}

export default CreateProjectService;
