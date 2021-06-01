import {
  clearDb,
  closeDbConnection,
  createDbConnection,
} from '@shared/infra/typeorm';

import AppError from '@shared/errors/AppError';
import BackofficeProvider from '@shared/container/providers/BackofficeProvider/fakes/FakeBackofficeProvider';
import HashProvider from '@shared/container/providers/HashProvider/implementations/HashProvider';
import AccountsRepository from '@modules/Accounts/infra/typeorm/repositories/AccountsRepository';
import CreateAccountService from '@modules/Accounts/services/CreateAccountService';

let createAccountService: CreateAccountService;

describe('Create Account', () => {
  beforeAll(async () => {
    await createDbConnection();
    await clearDb();

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
    await clearDb();
    await closeDbConnection();
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
