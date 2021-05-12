import AppError from '@shared/errors/AppError';
import Providers, { Account, Project } from '@utils/tests/Providers';

const providers = new Providers();
const {
  inviteMember,
  createProject,
  createAccount,
} = providers.projectsProvider();

let project: Project;
let account: Account;
let anotherAccount: Account;
let inviteMemberService: typeof inviteMember;
let createAccountService: typeof createAccount;
let createProjectService: typeof createProject;

describe('Invite Member', () => {
  beforeEach(async () => {
    const {
      inviteMember,
      createProject,
      createAccount,
    } = providers.projectsProvider();

    inviteMemberService = inviteMember;
    createAccountService = createAccount;
    createProjectService = createProject;

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
  });

  it('Should be able to send a new invite.', async () => {
    const invite = await inviteMemberService.execute({
      account_id: account.id,
      project_id: project.id,
      user_email: anotherAccount.user_email,
    });

    expect(invite).toHaveProperty('id');
  });

  it('Should not be able to send a new invite from an invalid account.', async () => {
    await expect(
      inviteMemberService.execute({
        account_id: 'non existing account id',
        project_id: project.id,
        user_email: anotherAccount.user_email,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able to send a new invite to own account.', async () => {
    await expect(
      inviteMemberService.execute({
        account_id: account.id,
        project_id: project.id,
        user_email: account.user_email,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able to send a new invite to an invalid account.', async () => {
    await expect(
      inviteMemberService.execute({
        account_id: account.id,
        project_id: project.id,
        user_email: 'non existing account email',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able to send a new invite with an invalid project.', async () => {
    await expect(
      inviteMemberService.execute({
        account_id: account.id,
        project_id: 'non existing project id',
        user_email: anotherAccount.user_email,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able to send a new invite with an invalid project.', async () => {
    await expect(
      inviteMemberService.execute({
        account_id: anotherAccount.id,
        project_id: project.id,
        user_email: account.user_email,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should be able to send a new invite a couple of times.', async () => {
    await inviteMemberService.execute({
      account_id: account.id,
      project_id: project.id,
      user_email: anotherAccount.user_email,
    });

    await expect(
      inviteMemberService.execute({
        account_id: account.id,
        project_id: project.id,
        user_email: anotherAccount.user_email,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
