import { getRepository, Repository } from 'typeorm';

import ICreateGroupDTO from '@modules/Groups/dtos/ICreateGroupDTO';
import Group from '@modules/Groups/infra/typeorm/entities/Group';

export default class GroupsRepository {
  private ormRepository: Repository<Group>;

  constructor() {
    this.ormRepository = getRepository(Group);
  }

  public async create(data: ICreateGroupDTO): Promise<Group> {
    const group = this.ormRepository.create(data);
    await this.ormRepository.save(group);
    return group;
  }

  public async findByName(group_name: string): Promise<Group | undefined> {
    const response = await this.ormRepository.findOne({
      where: { group_name },
    });
    return response;
  }
}
