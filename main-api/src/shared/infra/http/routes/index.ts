import { Router } from 'express';

import accountsRouter from '@modules/Accounts/infra/http/routes/accounts.routes';
import sessionsRouter from '@modules/Accounts/infra/http/routes/sessions.routes';
import projectsRouter from '@modules/Projects/infra/http/routes/projects.routes';
import invitesRouter from '@modules/Invites/infra/http/routes/invites.routes';
import membersRouter from '@modules/Members/infra/http/routes/members.routes';
import groupsRouter from '@modules/Groups/infra/http/routes/groups.routes';
// import backofficeRouter from './backoffice.routes';

const routes = Router();

// routes.use('/', backofficeRouter);

routes.use('/invites', invitesRouter);
routes.use('/accounts', accountsRouter);
routes.use('/accounts/session', sessionsRouter);

routes.use('/projects', projectsRouter);
routes.use('/projects/groups', groupsRouter);
routes.use('/projects/members', membersRouter);

export default routes;
