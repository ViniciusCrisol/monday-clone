// Fake repositories
import FakeHashProvider from '@shared/container/providers/HashProvider/fakes/FakeHashProvider';
import FakeBackofficeProvider from '@shared/container/providers/BackofficeProvider/fakes/FakeBackofficeProvider';
import FakeAccountsRepository from '@modules/Accounts/repositories/fakes/FakeAccountsRepository';
import FakeProjectsRepository from '@modules/Projects/repositories/fakes/FakeProjectsRepository';
import FakeInvitesRepository from '@modules/Projects/repositories/fakes/FakeInvitesRepository';

// Services
import InviteMemberService from '@modules/Projects/services/InviteMemberService';
import CreateProjectService from '@modules/Projects/services/CreateProjectService';
import CreateAccountService from '@modules/Accounts/services/CreateAccountService';
import AuthenticateAccountService from '@modules/Accounts/services/AuthenticateAccountService';
// Entities
import Account from '@modules/Accounts/infra/typeorm/entities/Account';
import Project from '@modules/Projects/infra/typeorm/entities/Project';
import Invite from '@modules/Projects/infra/typeorm/entities/Invite';

class Providers {
  userProvider() {
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

  projectsProvider() {
    const fakeHashProvider = new FakeHashProvider();
    const fakeInvitesRepository = new FakeInvitesRepository();
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

    const inviteMember = new InviteMemberService(
      fakeProjectsRepository,
      fakeAccountsRepository,
      fakeInvitesRepository,
    );

    return { createProject, createAccount, inviteMember };
  }
}

export default Providers;
export { Account, Project, Invite };
