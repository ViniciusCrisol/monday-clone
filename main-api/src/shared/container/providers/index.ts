import { container } from 'tsyringe';

import IBackofficeProvider from './BackofficeProvider/models/IBackofficeProvider';
import BackofficeProvider from './BackofficeProvider/implementations/BackofficeProvider';
import HashProvider from './HashProvider/implementations/HashProvider';

container.registerSingleton<HashProvider>('HashProvider', HashProvider);

container.registerSingleton<IBackofficeProvider>(
  'BackofficeProvider',
  BackofficeProvider,
);
