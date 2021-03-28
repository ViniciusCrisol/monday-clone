import { container } from 'tsyringe';
import './providers';

import IAccountsRepository from '@modules/Accounts/repositories/IAccountsRepository';
import AccountsRepository from '@modules/Accounts/infra/typeorm/repositories/AccountsRepository';

container.registerSingleton<IAccountsRepository>(
  'AccountsRepository',
  AccountsRepository,
);
