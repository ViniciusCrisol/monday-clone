import { uuid } from 'uuidv4';
import connection from '@shared/infra/typeorm';

import {
  BackofficeProvider,
  HashProvider,
  MembersRepository,
  ProjectsRepository,
  AccountsRepository,
} from '@utils/tests/context';
import AppError from '@shared/errors/AppError';
import CreateProjectService from '@modules/Projects/services/CreateProjectService';
import CreateAccountService from '@modules/Accounts/services/CreateAccountService';

let randonId: string;
let accountId: string;
let createProjectService: CreateProjectService;

describe('Create Project', () => {
  beforeAll(async () => {
    await connection.create();
    await connection.clear();

    const backofficeProvider = new BackofficeProvider();
    const hashProvider = new HashProvider();
    const membersRepository = new MembersRepository();
    const projectsRepository = new ProjectsRepository();
    const accounstRepository = new AccountsRepository();

    createProjectService = new CreateProjectService(
      accounstRepository,
      projectsRepository,
      membersRepository,
    );

    const createAccountService = new CreateAccountService(
      accounstRepository,
      hashProvider,
      backofficeProvider,
    );

    const account = await createAccountService.execute({
      user_name: 'John Doe',
      user_email: 'john@example.com',
      account_name: 'JohnDoeAccount',
      password: 'password',
      confirm_password: 'password',
    });

    await createProjectService.execute({
      project_name: 'Project Name',
      account_id: account.id,
    });

    randonId = uuid();
    accountId = account.id;
  });

  afterAll(async () => {
    await connection.clear();
    await connection.close();
  });

  it('Should be able to create a new project.', async () => {
    const project = await createProjectService.execute({
      project_name: 'New Project',
      account_id: accountId,
    });

    expect(project).toHaveProperty('id');
  });

  it('Should not be able to create a new project with a non existing account.', async () => {
    await expect(
      createProjectService.execute({
        project_name: 'Project Name',
        account_id: randonId,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able to create a new project with same name from another in the same account.', async () => {
    await expect(
      createProjectService.execute({
        project_name: 'Project Name',
        account_id: accountId,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able to create a new project if the user already has 30 other projects.', async () => {
    for (let i = 0; i <= 27; i++) {
      await createProjectService.execute({
        project_name: `Project ${i}`,
        account_id: accountId,
      });
    }

    await expect(
      createProjectService.execute({
        project_name: 'Project 31',
        account_id: accountId,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
