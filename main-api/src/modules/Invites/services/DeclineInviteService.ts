import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IInvitesRepository from '../repositories/IInvitesRepository';
import IAccountsRepository from '@modules/Accounts/repositories/IAccountsRepository';

interface IRequest {
  account_id: string;
  invite_id: string;
}

@injectable()
class DeclineInviteService {
  constructor(
    @inject('AccountsRepository')
    private accountsRepository: IAccountsRepository,

    @inject('InvitesRepository')
    private invitesRepository: IInvitesRepository,
  ) {}

  public async execute({ account_id, invite_id }: IRequest): Promise<void> {
    const invite = await this.invitesRepository.findById(invite_id);
    if (!invite) throw new AppError('invalidInvite');

    const account = await this.accountsRepository.findById(account_id);
    if (!account) throw new AppError('invalidAccount');
    if (invite.account_id !== account_id)
      throw new AppError('mustBeProjectOwner');

    await this.invitesRepository.deleteById(invite_id);
  }
}

export default DeclineInviteService;
