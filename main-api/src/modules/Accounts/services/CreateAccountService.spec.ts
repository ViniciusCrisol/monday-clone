import AppError from '@shared/errors/AppError';
import Providers from '@utils/tests/Providers';

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
      password: 'password',
      user_name: 'John Doe',
      user_email: 'john@example.com',
      account_name: 'JohnDoeAccount',
    });

    expect(account).toHaveProperty('id');
  });

  it('Should not be able to create a new account with same e-mail from another.', async () => {
    await createAccountService.execute({
      password: 'password',
      user_name: 'John Doe',
      user_email: 'john@example.com',
      account_name: 'JohnDoeAccount',
    });

    await expect(
      createAccountService.execute({
        password: 'password',
        user_name: 'John Doe',
        user_email: 'john@example.com',
        account_name: 'JohnDoeAccount',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
