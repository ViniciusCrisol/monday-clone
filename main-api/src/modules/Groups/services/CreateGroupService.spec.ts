import { uuid } from 'uuidv4';
import {
  clearDb,
  closeDbConnection,
  createDbConnection,
} from '@shared/infra/typeorm';

import AppError from '@shared/errors/AppError';
import AccountsRepository from '@modules/Accounts/infra/typeorm/repositories/AccountsRepository';
import GroupsRepository from '@modules/Groups/infra/typeorm/repositories/GroupsRepository';
import MemberGroupsRepository from '@modules/MemberGroups/infra/typeorm/repositories/MemberGroupsRepository';
import MembersRepository from '@modules/Members/infra/typeorm/repositories/MembersRepository';
import ProjectsRepository from '@modules/Projects/infra/typeorm/repositories/ProjectsRepository';
import BackofficeProvider from '@shared/container/providers/BackofficeProvider/fakes/FakeBackofficeProvider';
import HashProvider from '@shared/container/providers/HashProvider/implementations/HashProvider';
import CreateAccountService from '@modules/Accounts/services/CreateAccountService';
import CreateGroupService from '@modules/Groups/services/CreateGroupService';
import CreateProjectService from '@modules/Projects/services/CreateProjectService';

let randonId: string;
let accountId: string;
let projectId: string;
let anotherAccountId: string;

let createGroupService: CreateGroupService;

describe('Create Group', () => {
  beforeAll(async () => {
    await createDbConnection();
    await clearDb();

    const accounstRepository = new AccountsRepository();
    const groupsRepository = new GroupsRepository();
    const memberGroupsRepository = new MemberGroupsRepository();
    const membersRepository = new MembersRepository();
    const projectsRepository = new ProjectsRepository();
    const backofficeProvider = new BackofficeProvider();
    const hashProvider = new HashProvider();

    const createAccountService = new CreateAccountService(
      accounstRepository,
      hashProvider,
      backofficeProvider,
    );

    createGroupService = new CreateGroupService(
      accounstRepository,
      groupsRepository,
      memberGroupsRepository,
      membersRepository,
      projectsRepository,
    );

    const createProjectService = new CreateProjectService(
      accounstRepository,
      membersRepository,
      projectsRepository,
    );

    const account = await createAccountService.execute({
      user_name: 'John Doe',
      user_email: 'john@example.com',
      account_name: 'JohnDoeAccount',
      password: 'password',
      confirm_password: 'password',
    });

    const anotherAccount = await createAccountService.execute({
      user_name: 'John Doe',
      user_email: 'anotherJohn@example.com',
      account_name: 'JohnDoeAccount',
      password: 'password',
      confirm_password: 'password',
    });

    const project = await createProjectService.execute({
      account_id: account.id,
      project_name: 'New Project',
    });

    randonId = uuid();
    accountId = account.id;
    projectId = project.id;
    anotherAccountId = anotherAccount.id;
  });

  afterAll(async () => {
    await clearDb();
    await closeDbConnection();
  });

  it('should not be able to create an group from a non-existing account', async () => {
    await expect(
      createGroupService.execute({
        account_id: randonId,
        project_id: projectId,
        group_name: 'New Group',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create an group from a non-existing project', async () => {
    await expect(
      createGroupService.execute({
        account_id: accountId,
        project_id: randonId,
        group_name: 'New Group',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create an group from a non-existing project member', async () => {
    await expect(
      createGroupService.execute({
        account_id: anotherAccountId,
        project_id: randonId,
        group_name: 'New Group',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to create an new group', async () => {
    expect(
      await createGroupService.execute({
        account_id: accountId,
        project_id: projectId,
        group_name: 'New Group',
      }),
    );
  });

  it('should not be able to create a grooup with the same na from another', async () => {
    await expect(
      createGroupService.execute({
        account_id: accountId,
        project_id: projectId,
        group_name: 'New Group',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
