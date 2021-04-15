import Providers, { Account } from '@utils/tests/Providers';
import AppError from '@shared/errors/AppError';

const providers = new Providers();
const { createAccount } = providers.userProvider();
const { createProject } = providers.projectsProvider();

let account: Account;
let createAccountService: typeof createAccount;
let createProjectService: typeof createProject;

describe('Create Project', () => {
  beforeEach(async () => {
    const { createAccount } = providers.userProvider();
    const { createProject } = providers.projectsProvider();

    createAccountService = createAccount;
    createProjectService = createProject;

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

  it('Should not be able to create a new project with same name from another in a account.', async () => {
    const project = await createProjectService.execute({
      project_name: 'Project Name',
      account_id: account.id,
    });

    await expect(
      createProjectService.execute({
        project_name: 'Project Name',
        account_id: account.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
