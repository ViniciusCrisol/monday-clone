import ICreateInviteDTO from '../dtos/ICreateInviteDTO';
import IFindByAccountIdAndProjectIdDTO from '../dtos/IFindByAccountIdAndProjectIdDTO';
import Invite from '../infra/typeorm/entities/Invite';

export default interface IInvitesRepository {
  create(data: ICreateInviteDTO): Promise<Invite>;
  findAll(account_id: string): Promise<Invite[]>;
  findById(id: string): Promise<Invite | undefined>;
  findByAccountIdAndProjectId(
    data: IFindByAccountIdAndProjectIdDTO,
  ): Promise<Invite | undefined>;
}
