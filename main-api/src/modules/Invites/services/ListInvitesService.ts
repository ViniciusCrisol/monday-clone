import { inject, injectable } from 'tsyringe';

import { invalidAccount } from '@shared/errors/messages';
import AppError from '@shared/errors/AppError';
import Invite from '../infra/typeorm/entities/Invite';
import IInvitesRepository from '../repositories/IInvitesRepository';
import IAccountsRepository from '@modules/Accounts/repositories/IAccountsRepository';

@injectable()
class ListInvites {
  constructor(
    @inject('AccountsRepository')
    private accountsRepository: IAccountsRepository,

    @inject('InvitesRepository')
    private invitesRepository: IInvitesRepository,
  ) {}

  public async execute(account_id: string): Promise<Invite[]> {
    const account = await this.accountsRepository.findById(account_id);
    if (!account) {
      throw new AppError(invalidAccount.message);
    }

    const invites = await this.invitesRepository.findAll(account_id);
    return invites;
  }
}

export default ListInvites;
