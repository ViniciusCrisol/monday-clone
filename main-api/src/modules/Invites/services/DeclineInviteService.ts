import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import InvitesRepository from '@modules/Invites/infra/typeorm/repositories/InvitesRepository';
import AccountsRepository from '@modules/Accounts/infra/typeorm/repositories/AccountsRepository';

interface IRequest {
  account_id: string;
  invite_id: string;
}

@injectable()
export default class DeclineInviteService {
  constructor(
    @inject('InvitesRepository')
    private invitesRepository: InvitesRepository,

    @inject('AccountsRepository')
    private accountsRepository: AccountsRepository,
  ) {}

  public async execute({ account_id, invite_id }: IRequest): Promise<void> {
    const [invite, account] = await Promise.all([
      this.invitesRepository.findById(invite_id),
      this.accountsRepository.findById(account_id),
    ]);

    if (!invite) throw new AppError('invalidInvite');
    if (!account) throw new AppError('invalidAccount');
    if (invite.account_id !== account_id) throw new AppError('notAllowed');

    this.invitesRepository.deleteById(invite_id);
  }
}
