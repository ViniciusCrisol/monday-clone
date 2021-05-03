import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import InvitesController from '../controllers/InvitesController';
import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';

const invitesRoutes = Router();
const invitesController = new InvitesController();

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

export default invitesRoutes;
