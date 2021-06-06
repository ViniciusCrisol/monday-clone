import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import Account from '@modules/Accounts/infra/typeorm/entities/Account';
import AccountsRepository from '@modules/Accounts/infra/typeorm/repositories/AccountsRepository';
import HashProvider from '@shared/container/providers/HashProvider/implementations/HashProvider';
import IBackofficeProvider from '@shared/container/providers/BackofficeProvider/models/IBackofficeProvider';

interface IRequest {
  user_name: string;
  user_email: string;
  account_name: string;
  password: string;
  confirm_password: string;
}

@injectable()
export default class CreateAccountService {
  constructor(
    @inject('AccountsRepository')
    private accountsRepository: AccountsRepository,

    @inject('HashProvider')
    private hashProvider: HashProvider,

    @inject('BackofficeProvider')
    private backofficeProvider: IBackofficeProvider,
  ) {}

  public async execute({
    user_name,
    user_email,
    password,
    account_name,
    confirm_password,
  }: IRequest): Promise<Account> {
    if (password !== confirm_password)
      throw new AppError('passwordDoesNotMatch');

    const [account, passwordHash] = await Promise.all([
      this.accountsRepository.findByEmail(user_email),
      this.hashProvider.generateHash(password),
    ]);

    if (account) throw new AppError('emailAlreadyInUse');

    const newAccount = await this.accountsRepository.create({
      user_name,
      user_email,
      account_name,
      password_hash: passwordHash,
    });

    this.backofficeProvider.sendWelcomeMail(newAccount.id);
    return newAccount;
  }
}
