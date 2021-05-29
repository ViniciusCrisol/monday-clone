import connection from '@shared/infra/typeorm';

import {
  HashProvider,
  BackofficeProvider,
  AccountsRepository,
} from '@utils/tests/aliases';
import AppError from '@shared/errors/AppError';
import CreateAccountService from '@modules/Accounts/services/CreateAccountService';

let createAccountService: CreateAccountService;

describe('Create Account', () => {
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

  it('should not be able to create a new account with a wrong password confirmation', async () => {
    await expect(
      createAccountService.execute({
        user_name: 'John Doe',
        user_email: 'anotherJohn@example.com',
        account_name: 'JohnDoeAccount',
        password: 'password',
        confirm_password: 'wrong-password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new account with the same email from another', async () => {
    await expect(
      createAccountService.execute({
        user_name: 'John Doe',
        user_email: 'john@example.com',
        account_name: 'JohnDoeAccount',
        password: 'password',
        confirm_password: 'password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to create a new account', async () => {
    const anotherAccount = await createAccountService.execute({
      user_name: 'John Doe',
      user_email: 'anotherJohn@example.com',
      account_name: 'JohnDoeAccount',
      password: 'password',
      confirm_password: 'password',
    });
    expect(anotherAccount).toHaveProperty('id');
  });
});
