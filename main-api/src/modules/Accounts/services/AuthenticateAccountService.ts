import { injectable, inject } from 'tsyringe';
import { sign } from 'jsonwebtoken';

import authConfig from '@config/auth';
import AppError from '@shared/errors/AppError';
import Account from '@modules/Accounts/infra/typeorm/entities/Account';
import AccountsRepository from '@modules/Accounts/infra/typeorm/repositories/AccountsRepository';
import HashProvider from '@shared/container/providers/HashProvider/implementations/HashProvider';

interface IRequest {
  user_email: string;
  password: string;
}

interface IResponse {
  account: Account;
  token: string;
}

@injectable()
class AuthenticateAccountService {
  constructor(
    @inject('AccountsRepository')
    private accountsRepository: AccountsRepository,

    @inject('HashProvider')
    private hashProvider: HashProvider,
  ) {}

  public async execute({ user_email, password }: IRequest): Promise<IResponse> {
    const account = await this.accountsRepository.findByEmail(user_email);
    if (!account) throw new AppError('authenticationFail');

    const passwordMatched = await this.hashProvider.compareHash(
      password,
      account.password_hash,
    );
    if (!passwordMatched) throw new AppError('authenticationFail');

    const { secret, expiresIn } = authConfig.jwt;
    const token = sign({}, secret, { subject: account.id, expiresIn });
    return { account, token };
  }
}

export default AuthenticateAccountService;
