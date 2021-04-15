import Project from '../infra/typeorm/entities/Project';
import ICreateProjectDTO from '../dtos/ICreateProjectDTO';
import IFindProjectByNameAndAccountIdDTO from '../dtos/IFindProjectByNameAndAccountIdDTO';

export default interface IProjectsRepository {
  create(data: ICreateProjectDTO): Promise<Project>;
  findById(id: string): Promise<Project | undefined>;
  findByNameAndAccountId(
    data: IFindProjectByNameAndAccountIdDTO,
  ): Promise<Project | undefined>;
}
