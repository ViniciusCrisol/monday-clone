import ICreateInviteDTO from '../dtos/ICreateInviteDTO';
import IFindInviteByProjectIdDTO from '../dtos/IFindInviteByProjectIdDTO';
import Invite from '../infra/typeorm/entities/Invite';

export default interface IInvitesRepository {
  create(data: ICreateInviteDTO): Promise<Invite>;
  findAll(account_id: string): Promise<Invite[]>;
  findById(id: string): Promise<Invite | undefined>;
  findByProjectId(data: IFindInviteByProjectIdDTO): Promise<Invite | undefined>;
}
