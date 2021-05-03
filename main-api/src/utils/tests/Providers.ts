// Fake repositories
import FakeHashProvider from '@shared/container/providers/HashProvider/fakes/FakeHashProvider';
import FakeBackofficeProvider from '@shared/container/providers/BackofficeProvider/fakes/FakeBackofficeProvider';
import FakeAccountsRepository from '@modules/Accounts/repositories/fakes/FakeAccountsRepository';
import FakeProjectsRepository from '@modules/Projects/repositories/fakes/FakeProjectsRepository';
// Services
import CreateProjectService from '@modules/Projects/services/CreateProjectService';
import CreateAccountService from '@modules/Accounts/services/CreateAccountService';
import AuthenticateAccountService from '@modules/Accounts/services/AuthenticateAccountService';
// Entities
import Account from '@modules/Accounts/infra/typeorm/entities/Account';
import Project from '@modules/Projects/infra/typeorm/entities/Project';

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
    const fakeProjectsRepository = new FakeProjectsRepository();
    const fakeAccountsRepository = new FakeAccountsRepository();

    const createProject = new CreateProjectService(
      fakeProjectsRepository,
      fakeAccountsRepository,
    );

    return { createProject };
  }
}

export default Providers;
export { Account, Project };
