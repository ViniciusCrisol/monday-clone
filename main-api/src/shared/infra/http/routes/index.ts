import { Router } from 'express';

import backofficeRouter from './backoffice.routes';
import accountsRouter from '@modules/Accounts/infra/http/routes/accounts.routes';
import sessionsRouter from '@modules/Accounts/infra/http/routes/sessions.routes';

const routes = Router();

routes.use('/', backofficeRouter);
routes.use('/accounts', accountsRouter);
routes.use('/accounts/session', sessionsRouter);

export default routes;
