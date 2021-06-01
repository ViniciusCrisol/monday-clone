import { getRepository, Repository } from 'typeorm';

import ICreateProjectDTO from '@modules/Projects/dtos/ICreateProjectDTO';
import IFindProjectByNameDTO from '@modules/Projects/dtos/ICreateProjectDTO';
import Project from '@modules/Projects/infra/typeorm/entities/Project';

export default class ProjectsRepository {
  private ormRepository: Repository<Project>;

  constructor() {
    this.ormRepository = getRepository(Project);
  }

  public async create(data: ICreateProjectDTO): Promise<Project> {
    const project = this.ormRepository.create(data);
    await this.ormRepository.save(project);
    return project;
  }

  public async findById(project_id: string): Promise<Project | undefined> {
    const response = await this.ormRepository.findOne(project_id);
    return response;
  }

  public async findAll(account_id: string): Promise<Project[]> {
    const response = await this.ormRepository.find({
      where: { account_id },
      order: { inserted_at: 'DESC' },
    });
    return response;
  }

  public async count(account_id: string): Promise<number> {
    const response = await this.ormRepository.count({
      where: { account_id },
    });
    return response;
  }

  public async findByName({
    account_id,
    project_name,
  }: IFindProjectByNameDTO): Promise<Project | undefined> {
    const response = await this.ormRepository.findOne({
      where: { project_name, account_id },
    });
    return response;
  }
}
