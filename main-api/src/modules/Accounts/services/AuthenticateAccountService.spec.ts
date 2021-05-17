import AppError from '@shared/errors/AppError';
import Context, { Account } from '@utils/tests/Context';

const providers = new Context();
const { createAccount, autheticateAccount } = providers.user();

let account: Account;
let createAccountService: typeof createAccount;
let authenticateAccountService: typeof autheticateAccount;

describe('Authenticate Account', () => {
  beforeEach(async () => {
    const { createAccount, autheticateAccount } = providers.user();

    createAccountService = createAccount;
    authenticateAccountService = autheticateAccount;

    account = await createAccountService.execute({
      password: 'password',
      user_name: 'John Doe',
      user_email: 'john@example.com',
      account_name: 'JohnDoeAccount',
      confirm_password: 'password',
    });
  });

  it('Should be able to authenticate.', async () => {
    const response = await authenticateAccountService.execute({
      user_email: 'john@example.com',
      password: 'password',
    });

    expect(response).toHaveProperty('token');
    expect(response.account).toEqual(account);
  });

  it('Should not be able to authenticate with a wrong email.', async () => {
    await expect(
      authenticateAccountService.execute({
        user_email: 'wrongJohn@example.com',
        password: 'password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able to authenticate with a wrong password.', async () => {
    await expect(
      authenticateAccountService.execute({
        user_email: 'john@example.com',
        password: 'wrongPassword',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
