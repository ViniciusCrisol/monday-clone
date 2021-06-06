import { uuid } from 'uuidv4';
import {
  clearDb,
  closeDbConnection,
  createDbConnection,
} from '@shared/infra/typeorm';

import AppError from '@shared/errors/AppError';
import AccountsRepository from '@modules/Accounts/infra/typeorm/repositories/AccountsRepository';
import InvitesRepository from '@modules/Invites/infra/typeorm/repositories/InvitesRepository';
import MembersRepository from '@modules/Members/infra/typeorm/repositories/MembersRepository';
import ProjectsRepository from '@modules/Projects/infra/typeorm/repositories/ProjectsRepository';
import BackofficeProvider from '@shared/container/providers/BackofficeProvider/fakes/FakeBackofficeProvider';
import HashProvider from '@shared/container/providers/HashProvider/implementations/HashProvider';
import CreateAccountService from '@modules/Accounts/services/CreateAccountService';
import InviteMemberService from '@modules/Invites/services/InviteMemberService';
import CreateProjectService from '@modules/Projects/services/CreateProjectService';

let randonId: string;
let accountId: string;
let projectId: string;
let accountEmail: string;
let anotherAccountEmail: string;

let inviteMemberService: InviteMemberService;

describe('Invite Member', () => {
  beforeAll(async () => {
    await createDbConnection();
    await clearDb();

    const accounstRepository = new AccountsRepository();
    const invitesRepository = new InvitesRepository();
    const membersRepository = new MembersRepository();
    const projectsRepository = new ProjectsRepository();
    const backofficeProvider = new BackofficeProvider();
    const hashProvider = new HashProvider();

    const createAccountService = new CreateAccountService(
      accounstRepository,
      hashProvider,
      backofficeProvider,
    );

    inviteMemberService = new InviteMemberService(
      accounstRepository,
      invitesRepository,
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
    accountEmail = account.user_email;
    anotherAccountEmail = anotherAccount.user_email;
  });

  afterAll(async () => {
    await clearDb();
    await closeDbConnection();
  });

  it('should be able to send a new invite', async () => {
    const invite = await inviteMemberService.execute({
      account_id: accountId,
      project_id: projectId,
      user_email: anotherAccountEmail,
    });

    expect(invite).toHaveProperty('id');
  });

  it('should not be able to send a new invite from an invalid account', async () => {
    await expect(
      inviteMemberService.execute({
        account_id: randonId,
        project_id: projectId,
        user_email: anotherAccountEmail,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to send a new invite to own account', async () => {
    await expect(
      inviteMemberService.execute({
        account_id: accountId,
        project_id: projectId,
        user_email: accountEmail,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to send a new invite to an invalid account', async () => {
    await expect(
      inviteMemberService.execute({
        account_id: accountId,
        project_id: projectId,
        user_email: randonId,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to send a new invite with an invalid project', async () => {
    await expect(
      inviteMemberService.execute({
        account_id: accountId,
        project_id: randonId,
        user_email: anotherAccountEmail,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to send a new invite a couple of times', async () => {
    await expect(
      inviteMemberService.execute({
        account_id: accountId,
        project_id: projectId,
        user_email: anotherAccountEmail,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
