import Project from '@modules/Projects/infra/typeorm/entities/Project';
import Member from '../infra/typeorm/entities/Member';
import ICreateMemberDTO from '../dtos/ICreateMemberDTO';
import IFindMemberByProjectIdDTO from '../dtos/IFindMemberByProjectIdDTO';

export default interface IMembersRepository {
  create(data: ICreateMemberDTO): Promise<Member>;
  count(account_id: string): Promise<number>;
  findProjects(account_id: string): Promise<Project[]>;
  findById(id: string): Promise<Member | undefined>;
  findByProjectId(data: IFindMemberByProjectIdDTO): Promise<Member | undefined>;
}
