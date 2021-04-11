import * as repositories from '@utils/tests/repositories';

let account: repositories.Account;
let fakeHashProvider: repositories.FakeHashProvider;
let createAccountService: repositories.CreateAccountService;
let createProjectService: repositories.CreateProjectService;
let fakeBackofficeProvider: repositories.FakeBackofficeProvider;
let fakeAccountsRepository: repositories.FakeAccountsRepository;
let fakeProjectsRepository: repositories.FakeProjectsRepository;

describe('Create Project', () => {
  beforeEach(async () => {
    fakeHashProvider = new repositories.FakeHashProvider();
    fakeProjectsRepository = new repositories.FakeProjectsRepository();
    fakeBackofficeProvider = new repositories.FakeBackofficeProvider();
    fakeAccountsRepository = new repositories.FakeAccountsRepository();

    createAccountService = new repositories.CreateAccountService(
      fakeHashProvider,
      fakeBackofficeProvider,
      fakeAccountsRepository,
    );

    createProjectService = new repositories.CreateProjectService(
      fakeProjectsRepository,
    );

    account = await createAccountService.execute({
      password: 'password',
      user_name: 'John Doe',
      user_email: 'john@example.com',
      account_name: 'JohnDoeAccount',
    });
  });

  it('Should be able to create a new project.', async () => {
    const project = await createProjectService.execute({
      project_name: 'Project Name',
      account_id: account.id,
    });

    expect(project).toHaveProperty('id');
  });
});
