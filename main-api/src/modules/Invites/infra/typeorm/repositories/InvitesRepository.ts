import { getRepository, Repository } from 'typeorm';

import ICreateInviteDTO from '@modules/Invites/dtos/ICreateInviteDTO';
import IFindInviteByProjectIdDTO from '@modules/Invites/dtos/IFindInviteByProjectIdDTO';
import Invite from '../entities/Invite';
import IInvitesRepository from '@modules/Invites/repositories/IInvitesRepository';

class InvitesRepository implements IInvitesRepository {
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
      select: ['id', 'inserted_at', 'updated_at'],
      take: 30,
      where: { account_id },
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
