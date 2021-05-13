import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';
import SessionsController from '../controllers/SessionsController';

const sessionsRoutes = Router();
const accountSessionsController = new SessionsController();

sessionsRoutes.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      user_email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  accountSessionsController.create,
);

// Validate Session
sessionsRoutes.get('/', ensureAuthenticated, accountSessionsController.get);

export default sessionsRoutes;
