import { container } from 'tsyringe';
import './providers';

import IAccountsRepository from '@modules/Accounts/repositories/IAccountsRepository';
import AccountsRepository from '@modules/Accounts/infra/typeorm/repositories/AccountsRepository';

import IProjectsRepository from '@modules/Projects/repositories/IProjectsRepository';
import ProjectsRepository from '@modules/Projects/infra/typeorm/repositories/ProjectsRepository';

import IInvitesRepository from '@modules/Invites/repositories/IInvitesRepository';
import InvitesRepository from '@modules/Invites/infra/typeorm/repositories/InvitesRepository';

container.registerSingleton<IAccountsRepository>(
  'AccountsRepository',
  AccountsRepository,
);

container.registerSingleton<IProjectsRepository>(
  'ProjectsRepository',
  ProjectsRepository,
);

container.registerSingleton<IInvitesRepository>(
  'InvitesRepository',
  InvitesRepository,
);
