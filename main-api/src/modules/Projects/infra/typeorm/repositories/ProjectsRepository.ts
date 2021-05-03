import { getRepository, Repository } from 'typeorm';

import ICreateProjectDTO from '@modules/Projects/dtos/ICreateProjectDTO';
import IFindProjectByNameAndAccountIdDTO from '@modules/Projects/dtos/ICreateProjectDTO';
import Project from '../entities/Project';
import IProjectsRepository from '@modules/Projects/repositories/IProjectsRepository';

class ProjectsRepository implements IProjectsRepository {
  private ormRepository: Repository<Project>;

  constructor() {
    this.ormRepository = getRepository(Project);
  }

  public async create(data: ICreateProjectDTO): Promise<Project> {
    const project = this.ormRepository.create(data);
    await this.ormRepository.save(project);
    return project;
  }

  public async findById(id: string): Promise<Project | undefined> {
    const response = await this.ormRepository.findOne(id);
    return response;
  }

  public async findByNameAndAccountId({
    account_id,
    project_name,
  }: IFindProjectByNameAndAccountIdDTO): Promise<Project | undefined> {
    const response = await this.ormRepository.findOne({
      where: { project_name, account_id },
    });
    return response;
  }
}

export default ProjectsRepository;
