import { getRepository, Repository } from 'typeorm';

import ICreateMemberGroupDTO from '@modules/MemberGroups/dtos/ICreateMemberGroupDTO';
import MemberGroup from '@modules/MemberGroups/infra/typeorm/entities/MemberGroup';

export default class MemberMemberGroupsRepository {
  private ormRepository: Repository<MemberGroup>;

  constructor() {
    this.ormRepository = getRepository(MemberGroup);
  }

  public async create(data: ICreateMemberGroupDTO): Promise<MemberGroup> {
    const memberGroup = this.ormRepository.create(data);
    await this.ormRepository.save(memberGroup);
    return memberGroup;
  }
}
