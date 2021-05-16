import { uuid } from 'uuidv4';

import ICreateMemberDTO from '@modules/Members/dtos/ICreateMemberDTO';
import Member from '../../infra/typeorm/entities/Member';
import IMembersRepository from '@modules/Members/repositories/IMembersRepository';

class FakeMembersRepository implements IMembersRepository {
  private members: Member[] = [];

  public async create(data: ICreateMemberDTO): Promise<Member> {
    const role = new Member();
    Object.assign(role, { id: uuid(), ...data });

    this.members.push(role);
    return role;
  }

  public async findById(id: string): Promise<Member | undefined> {
    const response = this.members.find(role => role.id === id);
    return response;
  }
}

export default FakeMembersRepository;
