import FakeHashProvider from '@shared/container/providers/HashProvider/fakes/FakeHashProvider';
import FakeBackofficeProvider from '@shared/container/providers/BackofficeProvider/fakes/FakeBackofficeProvider';
import FakeAccountsRepository from '@modules/Accounts/repositories/fakes/FakeAccountsRepository';
import FakeProjectsRepository from '@modules/Projects/repositories/fakes/FakeProjectsRepository';
import CreateProjectService from '@modules/Projects/services/CreateProjectService';
import CreateAccountService from '@modules/Accounts/services/CreateAccountService';
import AuthenticateAccountService from '@modules/Accounts/services/AuthenticateAccountService';
import Account from '@modules/Accounts/infra/typeorm/entities/Account';
import Project from '@modules/Projects/infra/typeorm/entities/Project';
import AppError from '@shared/errors/AppError';

export {
  FakeBackofficeProvider,
  FakeHashProvider,
  FakeAccountsRepository,
  FakeProjectsRepository,
  CreateAccountService,
  AuthenticateAccountService,
  CreateProjectService,
  Account,
  Project,
  AppError,
};
