import ICreateInviteDTO from '../dtos/ICreateInviteDTO';
import IFindByProjectIdDTO from '../dtos/IFindByProjectIdDTO';
import Invite from '../infra/typeorm/entities/Invite';

export default interface IInvitesRepository {
  create(data: ICreateInviteDTO): Promise<Invite>;
  findAll(account_id: string): Promise<Invite[]>;
  findById(id: string): Promise<Invite | undefined>;
  findByProjectId(data: IFindByProjectIdDTO): Promise<Invite | undefined>;
}
