import {
  clearDb,
  closeDbConnection,
  createDbConnection,
} from '@shared/infra/typeorm';

import AppError from '@shared/errors/AppError';
import AccountsRepository from '@modules/Accounts/infra/typeorm/repositories/AccountsRepository';
import BackofficeProvider from '@shared/container/providers/BackofficeProvider/fakes/FakeBackofficeProvider';
import HashProvider from '@shared/container/providers/HashProvider/implementations/HashProvider';
import AuthenticateAccountService from '@modules/Accounts/services/AuthenticateAccountService';
import CreateAccountService from '@modules/Accounts/services/CreateAccountService';

let authenticateAccountService: AuthenticateAccountService;
let createAccountService: CreateAccountService;

describe('Authenticate Account', () => {
  beforeAll(async () => {
    await createDbConnection();
    await clearDb();

    const accounstRepository = new AccountsRepository();
    const backofficeProvider = new BackofficeProvider();
    const hashProvider = new HashProvider();

    authenticateAccountService = new AuthenticateAccountService(
      accounstRepository,
      hashProvider,
    );

    createAccountService = new CreateAccountService(
      accounstRepository,
      hashProvider,
      backofficeProvider,
    );

    await createAccountService.execute({
      user_name: 'John Doe',
      user_email: 'john@example.com',
      account_name: 'JohnDoeAccount',
      password: 'password',
      confirm_password: 'password',
    });
  });

  afterAll(async () => {
    await clearDb();
    await closeDbConnection();
  });

  it('should not be able to authenticate with a wrong email', async () => {
    await expect(
      authenticateAccountService.execute({
        user_email: 'wrongJohn@example.com',
        password: 'password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate with a wrong password', async () => {
    await expect(
      authenticateAccountService.execute({
        user_email: 'john@example.com',
        password: 'wrongPassword',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to authenticate', async () => {
    const response = await authenticateAccountService.execute({
      user_email: 'john@example.com',
      password: 'password',
    });
    expect(response).toHaveProperty('token');
  });
});
