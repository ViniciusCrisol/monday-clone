import { container } from 'tsyringe';
import './providers';

import MemberGroupsRepository from '@modules/MemberGroups/infra/typeorm/repositories/MemberGroupsRepository';
import AccountsRepository from '@modules/Accounts/infra/typeorm/repositories/AccountsRepository';
import ProjectsRepository from '@modules/Projects/infra/typeorm/repositories/ProjectsRepository';
import InvitesRepository from '@modules/Invites/infra/typeorm/repositories/InvitesRepository';
import MembersRepository from '@modules/Members/infra/typeorm/repositories/MembersRepository';
import GroupsRepository from '@modules/Groups/infra/typeorm/repositories/GroupsRepository';

container.registerSingleton<AccountsRepository>(
  'AccountsRepository',
  AccountsRepository,
);

container.registerSingleton<ProjectsRepository>(
  'ProjectsRepository',
  ProjectsRepository,
);

container.registerSingleton<InvitesRepository>(
  'InvitesRepository',
  InvitesRepository,
);

container.registerSingleton<MembersRepository>(
  'MembersRepository',
  MembersRepository,
);

container.registerSingleton<MemberGroupsRepository>(
  'MemberGroupsRepository',
  MemberGroupsRepository,
);

container.registerSingleton<GroupsRepository>(
  'GroupsRepository',
  GroupsRepository,
);
