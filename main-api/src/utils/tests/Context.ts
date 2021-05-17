// Fake repositories
import FakeHashProvider from '@shared/container/providers/HashProvider/fakes/FakeHashProvider';
import FakeBackofficeProvider from '@shared/container/providers/BackofficeProvider/fakes/FakeBackofficeProvider';
import FakeAccountsRepository from '@modules/Accounts/repositories/fakes/FakeAccountsRepository';
import FakeProjectsRepository from '@modules/Projects/repositories/fakes/FakeProjectsRepository';
import FakeInvitesRepository from '@modules/Invites/repositories/fakes/FakeInvitesRepository';
import FakeMembersRepository from '@modules/Members/repositories/fakes/FakeMembersRepository';

// Services
import CreateAccountService from '@modules/Accounts/services/CreateAccountService';
import AuthenticateAccountService from '@modules/Accounts/services/AuthenticateAccountService';
import CreateProjectService from '@modules/Projects/services/CreateProjectService';
import InviteMemberService from '@modules/Invites/services/InviteMemberService';
import DeclineInviteService from '@modules/Invites/services/DeclineInviteService';
import AcceptInviteService from '@modules/Invites/services/AcceptInviteService';

// Entities
import Account from '@modules/Accounts/infra/typeorm/entities/Account';
import Project from '@modules/Projects/infra/typeorm/entities/Project';
import Invite from '@modules/Invites/infra/typeorm/entities/Invite';
import Member from '@modules/Members/infra/typeorm/entities/Member';

class context {
  user() {
    const fakeHashProvider = new FakeHashProvider();
    const fakeBackofficeProvider = new FakeBackofficeProvider();
    const fakeAccountsRepository = new FakeAccountsRepository();

    const createAccount = new CreateAccountService(
      fakeHashProvider,
      fakeBackofficeProvider,
      fakeAccountsRepository,
    );

    const autheticateAccount = new AuthenticateAccountService(
      fakeAccountsRepository,
      fakeHashProvider,
    );

    return { createAccount, autheticateAccount };
  }

  project() {
    const fakeHashProvider = new FakeHashProvider();
    const fakeProjectsRepository = new FakeProjectsRepository();
    const fakeBackofficeProvider = new FakeBackofficeProvider();
    const fakeAccountsRepository = new FakeAccountsRepository();

    const createAccount = new CreateAccountService(
      fakeHashProvider,
      fakeBackofficeProvider,
      fakeAccountsRepository,
    );

    const createProject = new CreateProjectService(
      fakeProjectsRepository,
      fakeAccountsRepository,
    );

    return { createProject, createAccount };
  }

  invite() {
    const fakeHashProvider = new FakeHashProvider();
    const fakeInvitesRepository = new FakeInvitesRepository();
    const fakeProjectsRepository = new FakeProjectsRepository();
    const fakeBackofficeProvider = new FakeBackofficeProvider();
    const fakeAccountsRepository = new FakeAccountsRepository();
    const fakeMembersRepository = new FakeMembersRepository();

    const createAccount = new CreateAccountService(
      fakeHashProvider,
      fakeBackofficeProvider,
      fakeAccountsRepository,
    );

    const createProject = new CreateProjectService(
      fakeProjectsRepository,
      fakeAccountsRepository,
    );

    const inviteMember = new InviteMemberService(
      fakeProjectsRepository,
      fakeAccountsRepository,
      fakeInvitesRepository,
    );

    const declineInvite = new DeclineInviteService(
      fakeAccountsRepository,
      fakeInvitesRepository,
    );

    const acceptInvite = new AcceptInviteService(
      fakeProjectsRepository,
      fakeAccountsRepository,
      fakeInvitesRepository,
      fakeMembersRepository,
    );

    return {
      createProject,
      createAccount,
      inviteMember,
      declineInvite,
      acceptInvite,
    };
  }
}

export default context;
export { Account, Project, Invite, Member };
