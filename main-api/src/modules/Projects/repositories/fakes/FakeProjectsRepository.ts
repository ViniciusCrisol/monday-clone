import { uuid } from 'uuidv4';
import IProjectsRepository from '@modules/Projects/repositories/IProjectsRepository';
import IFindProjectByNameAndAccountIdDTO from '@modules/Projects/dtos/IFindProjectByNameAndAccountIdDTO';
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

  public async findByNameAndAccountId({
    account_id,
    project_name,
  }: IFindProjectByNameAndAccountIdDTO): Promise<Project | undefined> {
    const response = this.projects.find(
      project =>
        project.account_id === account_id &&
        project.project_name === project_name,
    );
    return response;
  }
}

export default FakeProjectsRepository;
