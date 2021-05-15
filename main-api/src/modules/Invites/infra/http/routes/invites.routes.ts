import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';
import InvitesController from '../controllers/InvitesController';
import DeclineInvitesController from '../controllers/DeclineInvitesController';

const invitesRoutes = Router();
const invitesController = new InvitesController();
const declineInvitesController = new DeclineInvitesController();

invitesRoutes.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      project_id: Joi.string().required(),
      user_email: Joi.string().required(),
    },
  }),
  ensureAuthenticated,
  invitesController.create,
);

invitesRoutes.get('/', ensureAuthenticated, invitesController.get);

invitesRoutes.patch(
  '/decline/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  ensureAuthenticated,
  declineInvitesController.decline,
);

export default invitesRoutes;
