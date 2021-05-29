import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import Account from '../infra/typeorm/entities/Account';
import IAccountsRepository from '../repositories/IAccountsRepository';
import IHashProvider from '@shared/container/providers/HashProvider/models/IHashProvider';
import IBackofficeProvider from '@shared/container/providers/BackofficeProvider/models/IBackofficeProvider';

interface IRequest {
  user_name: string;
  user_email: string;
  password: string;
  account_name: string;
  confirm_password: string;
}

@injectable()
class CreateAccountService {
  constructor(
    @inject('HashProvider')
    private hashProvider: IHashProvider,

    @inject('BackofficeProvider')
    private backofficeProvider: IBackofficeProvider,

    @inject('AccountsRepository')
    private accountsRepository: IAccountsRepository,
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

    const account = await this.accountsRepository.findByEmail(user_email);
    if (account) throw new AppError('emailAlreadyInUse');

    const hashedPassword = await this.hashProvider.generateHash(password);
    const newAccount = await this.accountsRepository.create({
      user_name,
      user_email,
      account_name,
      password_hash: hashedPassword,
    });

    this.backofficeProvider.sendWelcomeMail(newAccount.id);
    return newAccount;
  }
}

export default CreateAccountService;
