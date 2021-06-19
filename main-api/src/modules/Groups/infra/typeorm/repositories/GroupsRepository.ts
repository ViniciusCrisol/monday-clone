import { getRepository, Repository } from 'typeorm';

import IFindGroupByNameDTO from '@modules/Groups/dtos/IFindGroupByNameDTO';
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

  public async findByName({
    group_name,
    project_id,
  }: IFindGroupByNameDTO): Promise<Group | undefined> {
    const response = await this.ormRepository.findOne({
      where: { group_name, project_id },
    });
    return response;
  }

  public async list(project_id: string): Promise<Group[]> {
    const response = await this.ormRepository.find({
      where: { project_id },
      order: { inserted_at: 'DESC' },
      relations: ['members'],
    });
    return response;
  }
}
