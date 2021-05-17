import AppError from '@shared/errors/AppError';
import Context, { Account, Invite, Project } from '@utils/tests/Context';

const providers = new Context();
const { inviteMember, createProject, createAccount, declineInvite } =
  providers.invite();

let invite: Invite;
let project: Project;
let account: Account;
let anotherAccount: Account;
let inviteMemberService: typeof inviteMember;
let createAccountService: typeof createAccount;
let createProjectService: typeof createProject;
let declineInviteService: typeof declineInvite;

describe('Decline Invite', () => {
  beforeEach(async () => {
    const { inviteMember, createProject, createAccount, declineInvite } =
      providers.invite();

    inviteMemberService = inviteMember;
    createAccountService = createAccount;
    createProjectService = createProject;
    declineInviteService = declineInvite;

    account = await createAccountService.execute({
      password: 'password',
      user_name: 'John Doe',
      user_email: 'john@example.com',
      account_name: 'JohnDoeAccount',
      confirm_password: 'password',
    });

    anotherAccount = await createAccountService.execute({
      user_name: 'Another John Doe',
      user_email: 'anotherJohn@example.com',
      account_name: 'AnotherJohnDoeAccount',
      confirm_password: 'password',
      password: 'password',
    });

    project = await createProjectService.execute({
      project_name: 'New Project Name',
      account_id: account.id,
    });

    invite = await inviteMemberService.execute({
      account_id: account.id,
      project_id: project.id,
      user_email: anotherAccount.user_email,
    });
  });

  it('Should not be able to decline a non existing invite.', async () => {
    await expect(
      declineInviteService.execute({
        account_id: anotherAccount.id,
        invite_id: 'non existing invite id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able to decline a invite from a non existing account.', async () => {
    await expect(
      declineInviteService.execute({
        account_id: 'non existing account id',
        invite_id: invite.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able to decline a invite send to another account.', async () => {
    await expect(
      declineInviteService.execute({
        account_id: account.id,
        invite_id: invite.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
