import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import Invite from '../infra/typeorm/entities/Invite';
import IInvitesRepository from '../repositories/IInvitesRepository';
import IAccountsRepository from '@modules/Accounts/repositories/IAccountsRepository';
import IProjectsRepository from '@modules/Projects/repositories/IProjectsRepository';

interface IRequest {
  user_id: string;
  invite_id: string;
}

@injectable()
class AcceptInviteService {
  constructor(
    @inject('ProjectsRepository')
    private projectsRepository: IProjectsRepository,

    @inject('AccountsRepository')
    private accountsRepository: IAccountsRepository,

    @inject('InvitesRepository')
    private invitesRepository: IInvitesRepository,
  ) {}

  public async execute({ user_id, invite_id }: IRequest): Promise<Invite> {
    const invite = await this.invitesRepository.findById(invite_id);
    if (!invite) throw new AppError('invalidInvite');

    const account = await this.accountsRepository.findById(user_id);
    if (!account) throw new AppError('invalidAccount');

    return invite;
  }
}

export default AcceptInviteService;
