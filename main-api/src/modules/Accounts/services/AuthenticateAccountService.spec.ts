import connection from '@shared/infra/typeorm';

import {
  HashProvider,
  BackofficeProvider,
  AccountsRepository,
} from '@utils/tests/aliases';
import AppError from '@shared/errors/AppError';
import CreateAccountService from '@modules/Accounts/services/CreateAccountService';
import AuthenticateAccountService from '@modules/Accounts/services/AuthenticateAccountService';

let createAccountService: CreateAccountService;
let authenticateAccountService: AuthenticateAccountService;

describe('Authenticate Account', () => {
  beforeAll(async () => {
    await connection.create();
    await connection.clear();

    const hashProvider = new HashProvider();
    const backofficeProvider = new BackofficeProvider();
    const accounstRepository = new AccountsRepository();

    createAccountService = new CreateAccountService(
      accounstRepository,
      hashProvider,
      backofficeProvider,
    );

    authenticateAccountService = new AuthenticateAccountService(
      accounstRepository,
      hashProvider,
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
    await connection.clear();
    await connection.close();
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
