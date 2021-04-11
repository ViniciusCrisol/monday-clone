import { uuid } from 'uuidv4';
import IProjectsRepository from '@modules/Projects/repositories/IProjectsRepository';
import ICreateProjectDTO from '@modules/Projects/dtos/ICreateProjectDTO';
import Project from '../../infra/typeorm/entities/Project';

class FakeProjectsRepository implements IProjectsRepository {
  private projects: Project[] = [];

  public async create(data: ICreateProjectDTO): Promise<Project> {
    const project = new Project();
    Object.assign(project, { id: uuid(), ...data });

    this.projects.push(project);
    return project;
  }

  public async findById(id: string): Promise<Project | undefined> {
    const response = this.projects.find(project => project.id === id);
    return response;
  }

  public async findByName(projectName: string): Promise<Project | undefined> {
    const response = this.projects.find(
      project => project.project_name === projectName,
    );
    return response;
  }
}

export default FakeProjectsRepository;
