import connection from '@shared/infra/typeorm';

import {
  HashProvider,
  BackofficeProvider,
  AccountsRepository,
} from '@utils/tests/context';
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

  it('Should not be able to create a new account with a wrong password confitmation.', async () => {
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

  it('Should not be able to create a new account with same e-mail from another.', async () => {
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

  it('Should be able to create a new account.', async () => {
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
