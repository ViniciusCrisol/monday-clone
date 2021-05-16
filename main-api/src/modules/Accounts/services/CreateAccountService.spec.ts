import AppError from '@shared/errors/AppError';
import Providers from '@utils/tests/TestContext';

const providers = new Providers();
const { createAccount } = providers.userProvider();

let createAccountService: typeof createAccount;

describe('Create Account', () => {
  beforeEach(async () => {
    const { createAccount } = providers.userProvider();
    createAccountService = createAccount;
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
    await createAccountService.execute({
      password: 'password',
      user_name: 'John Doe',
      user_email: 'john@example.com',
      account_name: 'JohnDoeAccount',
      confirm_password: 'password',
    });

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
