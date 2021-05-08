import { uuid } from 'uuidv4';

import ICreateInviteDTO from '@modules/Projects/dtos/ICreateInviteDTO';
import Invite from '../../infra/typeorm/entities/Invite';
import IInvitesRepository from '@modules/Projects/repositories/IInvitesRepository';
import IFindByProjectIdDTO from '@modules/Projects/dtos/IFindByProjectIdDTO';

class FakeInvitesRepository implements IInvitesRepository {
  private invites: Invite[] = [];

  public async create(data: ICreateInviteDTO): Promise<Invite> {
    const project = new Invite();
    Object.assign(project, { id: uuid(), ...data });

    this.invites.push(project);
    return project;
  }

  public async findById(id: string): Promise<Invite | undefined> {
    const response = this.invites.find(project => project.id === id);
    return response;
  }

  public async findAll(account_id: string): Promise<Invite[]> {
    const response = this.invites.filter(
      invite => invite.account_id === account_id,
    );
    return response;
  }

  public async findByProjectId({
    account_id,
    project_id,
  }: IFindByProjectIdDTO): Promise<Invite | undefined> {
    const response = this.invites.find(
      invite =>
        invite.account_id === account_id && invite.project_id === project_id,
    );
    return response;
  }
}

export default FakeInvitesRepository;
