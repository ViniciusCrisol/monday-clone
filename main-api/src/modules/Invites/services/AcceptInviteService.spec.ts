import { uuid } from 'uuidv4';
import {
  clearDb,
  closeDbConnection,
  createDbConnection,
} from '@shared/infra/typeorm';

import AppError from '@shared/errors/AppError';
import BackofficeProvider from '@shared/container/providers/BackofficeProvider/fakes/FakeBackofficeProvider';
import HashProvider from '@shared/container/providers/HashProvider/implementations/HashProvider';
import AccountsRepository from '@modules/Accounts/infra/typeorm/repositories/AccountsRepository';
import ProjectsRepository from '@modules/Projects/infra/typeorm/repositories/ProjectsRepository';
import InvitesRepository from '@modules/Invites/infra/typeorm/repositories/InvitesRepository';
import MembersRepository from '@modules/Members/infra/typeorm/repositories/MembersRepository';
import InviteMemberService from '@modules/Invites/services/InviteMemberService';
import AcceptInviteService from '@modules/Invites/services/AcceptInviteService';
import CreateProjectService from '@modules/Projects/services/CreateProjectService';
import CreateAccountService from '@modules/Accounts/services/CreateAccountService';

let randonId: string;
let inviteId: string;
let accountId: string;
let anotherAccountId: string;
let acceptInviteService: AcceptInviteService;

describe('Accept Invite', () => {
  beforeAll(async () => {
    await createDbConnection();
    await clearDb();

    const backofficeProvider = new BackofficeProvider();
    const hashProvider = new HashProvider();
    const membersRepository = new MembersRepository();
    const invitesRepository = new InvitesRepository();
    const projectsRepository = new ProjectsRepository();
    const accounstRepository = new AccountsRepository();

    const inviteMemberService = new InviteMemberService(
      invitesRepository,
      membersRepository,
      projectsRepository,
      accounstRepository,
    );

    acceptInviteService = new AcceptInviteService(
      invitesRepository,
      membersRepository,
      projectsRepository,
      accounstRepository,
    );

    const createProjectService = new CreateProjectService(
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

    const invite = await inviteMemberService.execute({
      account_id: account.id,
      project_id: project.id,
      user_email: anotherAccount.user_email,
    });

    randonId = uuid();
    inviteId = invite.id;
    accountId = account.id;
    anotherAccountId = anotherAccount.id;
  });

  afterAll(async () => {
    await clearDb();
    await closeDbConnection();
  });

  it('should not be able to accept a non-existing invite', async () => {
    await expect(
      acceptInviteService.execute({
        account_id: anotherAccountId,
        invite_id: randonId,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to accept an invite from a non-existing account', async () => {
    await expect(
      acceptInviteService.execute({
        account_id: randonId,
        invite_id: inviteId,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to accept an invite send to another account', async () => {
    await expect(
      acceptInviteService.execute({
        account_id: accountId,
        invite_id: inviteId,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to accept an invite', async () => {
    expect(
      await acceptInviteService.execute({
        account_id: anotherAccountId,
        invite_id: inviteId,
      }),
    );
  });
});
