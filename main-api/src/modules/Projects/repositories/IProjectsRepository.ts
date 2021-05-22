import ICreateProjectDTO from '../dtos/ICreateProjectDTO';
import IFindProjectByNameDTO from '../dtos/IFindProjectByNameDTO';
import Project from '../infra/typeorm/entities/Project';

export default interface IProjectsRepository {
  create(data: ICreateProjectDTO): Promise<Project>;
  findAll(account_id: string): Promise<Project[]>;
  count(account_id: string): Promise<number>;
  findById(id: string): Promise<Project | undefined>;
  findByName(data: IFindProjectByNameDTO): Promise<Project | undefined>;
}
