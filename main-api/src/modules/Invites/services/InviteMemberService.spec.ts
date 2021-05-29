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
import CreateProjectService from '@modules/Projects/services/CreateProjectService';
import CreateAccountService from '@modules/Accounts/services/CreateAccountService';

let randonId: string;
let accountId: string;
let accountEmail: string;
let projectId: string;
let anotherAccountId: string;
let anotherAccountEmail: string;
let inviteMemberService: InviteMemberService;

describe('Invite Member', () => {
  beforeAll(async () => {
    await connection.create();
    await connection.clear();

    const backofficeProvider = new BackofficeProvider();
    const hashProvider = new HashProvider();
    const membersRepository = new MembersRepository();
    const invitesRepository = new InvitesRepository();
    const projectsRepository = new ProjectsRepository();
    const accounstRepository = new AccountsRepository();

    inviteMemberService = new InviteMemberService(
      projectsRepository,
      accounstRepository,
      invitesRepository,
      membersRepository,
    );

    const createProjectService = new CreateProjectService(
      projectsRepository,
      accounstRepository,
      membersRepository,
    );

    const createAccountService = new CreateAccountService(
      hashProvider,
      backofficeProvider,
      accounstRepository,
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
    accountEmail = account.user_email;
    projectId = project.id;
    anotherAccountId = anotherAccount.id;
    anotherAccountEmail = anotherAccount.user_email;
  });

  afterAll(async () => {
    await connection.clear();
    await connection.close();
  });

  it('Should be able to send a new invite.', async () => {
    const invite = await inviteMemberService.execute({
      account_id: accountId,
      project_id: projectId,
      user_email: anotherAccountEmail,
    });

    expect(invite).toHaveProperty('id');
  });

  it('Should not be able to send a new invite from an invalid account.', async () => {
    await expect(
      inviteMemberService.execute({
        account_id: randonId,
        project_id: projectId,
        user_email: anotherAccountEmail,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able to send a new invite to own account.', async () => {
    await expect(
      inviteMemberService.execute({
        account_id: accountId,
        project_id: projectId,
        user_email: accountEmail,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able to send a new invite to an invalid account.', async () => {
    await expect(
      inviteMemberService.execute({
        account_id: accountId,
        project_id: projectId,
        user_email: randonId,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able to send a new invite with an invalid project.', async () => {
    await expect(
      inviteMemberService.execute({
        account_id: accountId,
        project_id: randonId,
        user_email: anotherAccountEmail,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able to send a new invite with an invalid project.', async () => {
    await expect(
      inviteMemberService.execute({
        account_id: anotherAccountId,
        project_id: projectId,
        user_email: accountEmail,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should be able to send a new invite a couple of times.', async () => {
    await expect(
      inviteMemberService.execute({
        account_id: accountId,
        project_id: projectId,
        user_email: anotherAccountEmail,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
