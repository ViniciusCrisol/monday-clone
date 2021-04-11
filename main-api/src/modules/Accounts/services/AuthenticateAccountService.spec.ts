import * as repositories from '@utils/tests/repositories';

let account: repositories.Account;
let fakeHashProvider: repositories.FakeHashProvider;
let createAccountService: repositories.CreateAccountService;
let fakeBackofficeProvider: repositories.FakeBackofficeProvider;
let fakeAccountsRepository: repositories.FakeAccountsRepository;
let authenticateAccountService: repositories.AuthenticateAccountService;

describe('Authenticate Account', () => {
  beforeEach(async () => {
    fakeHashProvider = new repositories.FakeHashProvider();
    fakeBackofficeProvider = new repositories.FakeBackofficeProvider();
    fakeAccountsRepository = new repositories.FakeAccountsRepository();

    createAccountService = new repositories.CreateAccountService(
      fakeHashProvider,
      fakeBackofficeProvider,
      fakeAccountsRepository,
    );
    authenticateAccountService = new repositories.AuthenticateAccountService(
      fakeAccountsRepository,
      fakeHashProvider,
    );

    account = await createAccountService.execute({
      password: 'password',
      user_name: 'John Doe',
      user_email: 'john@example.com',
      account_name: 'JohnDoeAccount',
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
    ).rejects.toBeInstanceOf(repositories.AppError);
  });

  it('Should not be able to authenticate with a wrong password.', async () => {
    await expect(
      authenticateAccountService.execute({
        user_email: 'john@example.com',
        password: 'wrongPassword',
      }),
    ).rejects.toBeInstanceOf(repositories.AppError);
  });
});
