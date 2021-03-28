import { container } from 'tsyringe';

import IBackofficeProvider from './BackofficeProvider/models/IBackofficeProvider';
import BackofficeProvider from './BackofficeProvider/implementations/BackofficeProvider';

import IHashProvider from './HashProvider/models/IHashProvider';
import BCryptHashProvider from './HashProvider/implementations/BCryptHashProvider';

container.registerSingleton<IHashProvider>('HashProvider', BCryptHashProvider);

container.registerSingleton<IBackofficeProvider>(
  'BackofficeProvider',
  BackofficeProvider,
);
