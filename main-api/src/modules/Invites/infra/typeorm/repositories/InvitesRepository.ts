import { getRepository, Repository } from 'typeorm';

import IFindInviteByProjectIdDTO from '@modules/Invites/dtos/IFindInviteByProjectIdDTO';
import ICreateInviteDTO from '@modules/Invites/dtos/ICreateInviteDTO';
import Invite from '@modules/Invites/infra/typeorm/entities/Invite';

class InvitesRepository {
  private ormRepository: Repository<Invite>;

  constructor() {
    this.ormRepository = getRepository(Invite);
  }

  public async create(data: ICreateInviteDTO): Promise<Invite> {
    const invite = this.ormRepository.create(data);
    await this.ormRepository.save(invite);
    return invite;
  }

  public async deleteById(id: string): Promise<void> {
    this.ormRepository.delete(id);
  }

  public async findById(id: string): Promise<Invite | undefined> {
    const response = await this.ormRepository.findOne(id);
    return response;
  }

  public async findAll(account_id: string): Promise<Invite[]> {
    const response = await this.ormRepository.find({
      take: 30,
      where: { account_id },
      select: ['id', 'inserted_at', 'updated_at'],
      relations: ['project'],
      order: { inserted_at: 'DESC' },
    });
    return response;
  }

  public async findByProjectId({
    account_id,
    project_id,
  }: IFindInviteByProjectIdDTO): Promise<Invite | undefined> {
    const response = this.ormRepository.findOne({
      where: {
        account_id,
        project_id,
      },
    });
    return response;
  }
}

export default InvitesRepository;
