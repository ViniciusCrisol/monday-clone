// Fake repositories
import FakeHashProvider from '@shared/container/providers/HashProvider/implementations/BCryptHashProvider';
import FakeBackofficeProvider from '@shared/container/providers/BackofficeProvider/fakes/FakeBackofficeProvider';
import FakeAccountsRepository from '@modules/Accounts/infra/typeorm/repositories/AccountsRepository';
import FakeProjectsRepository from '@modules/Projects/repositories/IProjectsRepository';
import FakeInvitesRepository from '@modules/Invites/repositories/IInvitesRepository';
import FakeMembersRepository from '@modules/Members/repositories/IMembersRepository';

// Services

import Account from '@modules/Accounts/infra/typeorm/entities/Account';
import Project from '@modules/Projects/infra/typeorm/entities/Project';
import Invite from '@modules/Invites/infra/typeorm/entities/Invite';
import Member from '@modules/Members/infra/typeorm/entities/Member';

export {
  Account,
  Project,
  Invite,
  Member,
  //
  //
  //
  //
  //
  FakeAccountsRepository,
  FakeProjectsRepository,
  FakeInvitesRepository,
  FakeMembersRepository,
  FakeHashProvider,
  FakeBackofficeProvider,
  ////
  // CreateAccountService,
  // AuthenticateAccountService,
  // CreateProjectService,
  // InviteMemberService,
  // DeclineInviteService,
};
