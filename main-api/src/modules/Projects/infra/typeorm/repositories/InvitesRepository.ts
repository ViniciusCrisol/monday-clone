import { getRepository, Repository } from 'typeorm';

import ICreateInviteDTO from '@modules/Projects/dtos/ICreateInviteDTO';
import IFindByAccountIdAndProjectIdDTO from '@modules/Projects/dtos/IFindByAccountIdAndProjectIdDTO';
import Invite from '../entities/Invite';
import IInvitesRepository from '@modules/Projects/repositories/IInvitesRepository';

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

  public async findById(id: string): Promise<Invite | undefined> {
    const response = await this.ormRepository.findOne(id);
    return response;
  }

  public async findAll(account_id: string): Promise<Invite[]> {
    const response = await this.ormRepository.find({
      take: 30,
      where: { account_id },
      order: { inserted_at: 'DESC' },
    });
    return response;
  }

  public async findByAccountIdAndProjectId({
    account_id,
    project_id,
  }: IFindByAccountIdAndProjectIdDTO): Promise<Invite | undefined> {
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
