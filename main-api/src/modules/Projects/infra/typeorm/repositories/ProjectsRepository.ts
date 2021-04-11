import { getRepository, Repository } from 'typeorm';
import ICreateProjectDTO from '@modules/Projects/dtos/ICreateProjectDTO';
import IProjectsRepository from '@modules/Projects/repositories/IProjectsRepository';
import Project from '../entities/Project';

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

  public async findByName(projectName: string): Promise<Project | undefined> {
    const response = await this.ormRepository.findOne({
      where: { project_name: projectName },
    });
    return response;
  }
}

export default ProjectsRepository;
