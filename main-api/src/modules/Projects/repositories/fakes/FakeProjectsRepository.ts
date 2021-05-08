import { uuid } from 'uuidv4';

import ICreateProjectDTO from '@modules/Projects/dtos/ICreateProjectDTO';
import IFindProjectByNameDTO from '@modules/Projects/dtos/IFindProjectByNameDTO';
import Project from '../../infra/typeorm/entities/Project';
import IProjectsRepository from '@modules/Projects/repositories/IProjectsRepository';

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

  public async findAll(id: string): Promise<Project[]> {
    const response = this.projects.filter(project => project.id === id);
    return response;
  }

  public async count(id: string): Promise<Number> {
    const response = this.projects.filter(project => project.id === id);
    return response.length;
  }

  public async findByName({
    account_id,
    project_name,
  }: IFindProjectByNameDTO): Promise<Project | undefined> {
    const response = this.projects.find(
      project =>
        project.account_id === account_id &&
        project.project_name === project_name,
    );
    return response;
  }
}

export default FakeProjectsRepository;
