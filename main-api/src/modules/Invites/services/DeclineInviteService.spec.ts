import { uuid } from 'uuidv4';
import connection from '@shared/infra/typeorm';

import {
  BackofficeProvider,
  HashProvider,
  MembersRepository,
  InvitesRepository,
  ProjectsRepository,
  AccountsRepository,
} from '@utils/tests/context';
import AppError from '@shared/errors/AppError';
import InviteMemberService from '@modules/Invites/services/InviteMemberService';
import DeclineInviteService from '@modules/Invites/services/DeclineInviteService';
import CreateProjectService from '@modules/Projects/services/CreateProjectService';
import CreateAccountService from '@modules/Accounts/services/CreateAccountService';

let randonId: string;
let inviteId: string;
let accountId: string;
let anotherAccountId: string;
let declineInviteService: DeclineInviteService;

describe('Decline Invite', () => {
  beforeAll(async () => {
    await connection.create();
    await connection.clear();

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

    declineInviteService = new DeclineInviteService(
      invitesRepository,
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
    await connection.clear();
    await connection.close();
  });

  it('Should not be able to decline an non existing invite.', async () => {
    await expect(
      declineInviteService.execute({
        account_id: anotherAccountId,
        invite_id: randonId,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able to decline a invite from an non existing account.', async () => {
    await expect(
      declineInviteService.execute({
        account_id: randonId,
        invite_id: inviteId,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able to decline a invite sended to another account.', async () => {
    await expect(
      declineInviteService.execute({
        account_id: accountId,
        invite_id: inviteId,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should be able to decline an invite.', async () => {
    expect(
      await declineInviteService.execute({
        account_id: anotherAccountId,
        invite_id: inviteId,
      }),
    );
  });
});
