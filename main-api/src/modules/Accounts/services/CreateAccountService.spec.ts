import AppError from '@shared/errors/AppError';
import {
  FakeHashProvider,
  FakeBackofficeProvider,
  FakeAccountsRepository,
} from '@utils/tests/context';
import connection from '@shared/infra/typeorm';

import CreateAccountService from '@modules/Accounts/services/CreateAccountService';

let createAccountService: any;

describe('Create Account', () => {
  beforeAll(async () => {
    await connection.create();
  });

  afterAll(async () => {
    await connection.close();
  });

  beforeEach(async () => {
    await connection.clear();

    const f = new FakeHashProvider();
    const a = new FakeBackofficeProvider();
    const e = new FakeAccountsRepository();

    createAccountService = new CreateAccountService(f, a, e);
  });

  it('Should be able to create a new account.', async () => {
    const account = await createAccountService.execute({
      user_name: 'John Doe',
      user_email: 'john@example.com',
      account_name: 'JohnDoeAccount',
      password: 'password',
      confirm_password: 'password',
    });

    expect(account).toHaveProperty('id');
  });

  it('Should not be able to create a new account with same e-mail from another.', async () => {
    await expect(
      createAccountService.execute({
        password: 'password',
        user_name: 'John Doe',
        user_email: 'john@example.com',
        account_name: 'JohnDoeAccount',
        confirm_password: 'password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able to create a new account with a wrong password confitmation.', async () => {
    await expect(
      createAccountService.execute({
        password: 'password',
        user_name: 'John Doe',
        user_email: 'john@example.com',
        account_name: 'JohnDoeAccount',
        confirm_password: 'wrong-password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
