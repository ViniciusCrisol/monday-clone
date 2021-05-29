import { uuid } from 'uuidv4';

import ICreateMemberDTO from '@modules/Members/dtos/ICreateMemberDTO';
import IFindMemberByProjectIdDTO from '@modules/Members/dtos/IFindMemberByProjectIdDTO';
import Project from '@modules/Projects/infra/typeorm/entities/Project';
import Member from '../../infra/typeorm/entities/Member';
import IMembersRepository from '@modules/Members/repositories/IMembersRepository';

class MembersRepository implements IMembersRepository {
  private members: Member[] = [];

  public async create(data: ICreateMemberDTO): Promise<Member> {
    const member = new Member();
    Object.assign(member, { id: uuid(), ...data });

    this.members.push(member);
    return member;
  }

  public async count(id: string): Promise<number> {
    const response = this.members.filter(member => member.account_id === id);
    return response.length;
  }

  public async findProjects(id: string): Promise<Project[]> {
    const members = this.members.filter(member => member.account_id === id);
    const response = members.map(member => member.project);
    return response;
  }

  public async findById(id: string): Promise<Member | undefined> {
    const response = this.members.find(member => member.id === id);
    return response;
  }

  public async findByProjectId({
    account_id,
    project_id,
  }: IFindMemberByProjectIdDTO): Promise<Member | undefined> {
    const response = this.members.find(
      member => member.id === account_id && member.project_id === project_id,
    );
    return response;
  }
}

export default MembersRepository;
