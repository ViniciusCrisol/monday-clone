import { container } from 'tsyringe';
import './providers';

import AccountsRepository from '@modules/Accounts/infra/typeorm/repositories/AccountsRepository';
// import ActivitiesRepository from '@modules/Activities/infra/typeorm/repositories/ActivitiesRepository'
import GroupsRepository from '@modules/Groups/infra/typeorm/repositories/GroupsRepository';
import InvitesRepository from '@modules/Invites/infra/typeorm/repositories/InvitesRepository';
import MemberGroupsRepository from '@modules/MemberGroups/infra/typeorm/repositories/MemberGroupsRepository';
import MembersRepository from '@modules/Members/infra/typeorm/repositories/MembersRepository';
import ProjectsRepository from '@modules/Projects/infra/typeorm/repositories/ProjectsRepository';

container.registerSingleton<AccountsRepository>(
  'AccountsRepository',
  AccountsRepository,
);

// container.registerSingleton<ActivitiesRepository>(
//   'ActivitiesRepository',
//   ActivitiesRepository,
// );

container.registerSingleton<GroupsRepository>(
  'GroupsRepository',
  GroupsRepository,
);

container.registerSingleton<InvitesRepository>(
  'InvitesRepository',
  InvitesRepository,
);

container.registerSingleton<MemberGroupsRepository>(
  'MemberGroupsRepository',
  MemberGroupsRepository,
);

container.registerSingleton<MembersRepository>(
  'MembersRepository',
  MembersRepository,
);

container.registerSingleton<ProjectsRepository>(
  'ProjectsRepository',
  ProjectsRepository,
);
