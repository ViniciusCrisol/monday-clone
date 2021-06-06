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
import AcceptInviteService from '@modules/Invites/services/AcceptInviteService';
import InviteMemberService from '@modules/Invites/services/InviteMemberService';
import UpdateMemberRoleService from '@modules/Members/services/UpdateMemberRoleService';
import CreateProjectService from '@modules/Projects/services/CreateProjectService';

let randonId: string;
let memberId: string;
let accountId: string;
let anotherAccountId: string;

let updateMemberRoleService: UpdateMemberRoleService;

describe('Update Member Role', () => {
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

    const acceptInviteService = new AcceptInviteService(
      accounstRepository,
      invitesRepository,
      membersRepository,
      projectsRepository,
    );

    const inviteMemberService = new InviteMemberService(
      accounstRepository,
      invitesRepository,
      membersRepository,
      projectsRepository,
    );

    updateMemberRoleService = new UpdateMemberRoleService(
      accounstRepository,
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

    const invite = await inviteMemberService.execute({
      account_id: account.id,
      project_id: project.id,
      user_email: anotherAccount.user_email,
    });

    const member = await acceptInviteService.execute({
      account_id: anotherAccount.id,
      invite_id: invite.id,
    });

    randonId = uuid();
    memberId = member.id;
    accountId = account.id;
    anotherAccountId = anotherAccount.id;
  });

  afterAll(async () => {
    await clearDb();
    await closeDbConnection();
  });

  it('should not be able to update an role from a non-existing member', async () => {
    await expect(
      updateMemberRoleService.execute({
        role: 'READER',
        account_id: accountId,
        member_id: randonId,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update an role from a non-existing account', async () => {
    await expect(
      updateMemberRoleService.execute({
        role: 'READER',
        account_id: randonId,
        member_id: anotherAccountId,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update an role', async () => {
    await updateMemberRoleService.execute({
      role: 'PROJECT_LEADER',
      account_id: accountId,
      member_id: memberId,
    });
  });

  it('should not be able to update an role', async () => {
    await updateMemberRoleService.execute({
      role: 'READER',
      account_id: anotherAccountId,
      member_id: memberId,
    });
  });

  it('should not be able to update an role', async () => {
    await expect(
      updateMemberRoleService.execute({
        role: 'PROJECT_LEADER',
        account_id: anotherAccountId,
        member_id: memberId,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
