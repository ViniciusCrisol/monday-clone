import { container } from 'tsyringe';

import BackofficeProvider from './BackofficeProvider/implementations/BackofficeProvider';
import HashProvider from './HashProvider/implementations/HashProvider';

container.registerSingleton<BackofficeProvider>(
  'BackofficeProvider',
  BackofficeProvider,
);

container.registerSingleton<HashProvider>('HashProvider', HashProvider);
