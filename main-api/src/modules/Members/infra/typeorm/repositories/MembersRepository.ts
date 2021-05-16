import { getRepository, Repository } from 'typeorm';

import ICreateMemberDTO from '@modules/Members/dtos/ICreateMemberDTO';
import Member from '../entities/Member';
import IMembersRepository from '@modules/Members/repositories/IMembersRepository';

class MembersRepository implements IMembersRepository {
  private ormRepository: Repository<Member>;

  constructor() {
    this.ormRepository = getRepository(Member);
  }

  public async create(data: ICreateMemberDTO): Promise<Member> {
    const member = this.ormRepository.create(data);
    await this.ormRepository.save(member);
    return member;
  }

  public async findById(id: string): Promise<Member | undefined> {
    const response = await this.ormRepository.findOne(id);
    return response;
  }
}

export default MembersRepository;
