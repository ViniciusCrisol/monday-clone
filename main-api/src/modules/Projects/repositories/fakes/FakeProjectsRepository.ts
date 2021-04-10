import { uuid } from 'uuidv4';
import IProjectsRepository from '@modules/Projects/repositories/IProjectsRepository';
import ICreateProjectDTO from '@modules/Projects/dtos/ICreateProjectDTO';
import Project from '../../infra/typeorm/entities/Project';

class FakeProjectsRepository implements IProjectsRepository {
  private project: Project[] = [];

  public async create(data: ICreateProjectDTO): Promise<Project> {
    const project = new Project();
    Object.assign(Project, { id: uuid(), ...data });

    this.project.push(project);
    return project;
  }

  public async findById(id: string): Promise<Project | undefined> {
    const response = this.project.find(project => project.id === id);
    return response;
  }
}

export default FakeProjectsRepository;
