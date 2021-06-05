import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import Invite from '@modules/Invites/infra/typeorm/entities/Invite';
import InvitesRepository from '@modules/Invites/infra/typeorm/repositories/InvitesRepository';
import AccountsRepository from '@modules/Accounts/infra/typeorm/repositories/AccountsRepository';

@injectable()
export default class ListInvitesService {
  constructor(
    @inject('InvitesRepository')
    private invitesRepository: InvitesRepository,

    @inject('AccountsRepository')
    private accountsRepository: AccountsRepository,
  ) {}

  public async execute(account_id: string): Promise<Invite[]> {
    const account = await this.accountsRepository.findById(account_id);
    if (!account) throw new AppError('invalidAccount');

    const invites = await this.invitesRepository.findAll(account_id);
    return invites;
  }
}
