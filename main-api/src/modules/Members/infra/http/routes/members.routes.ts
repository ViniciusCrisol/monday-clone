import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import validateMemberRole from '@utils/validations/validateMemberRole';
import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';
import UpdateMemberRolesController from '../controllers/UpdateMemberRolesController';

const membersRoutes = Router();
const updateMemberRolesController = new UpdateMemberRolesController();

membersRoutes.patch(
  '/role/:id',
  celebrate({
    [Segments.PARAMS]: { id: Joi.string().uuid() },
    [Segments.BODY]: {
      role: Joi.string().regex(validateMemberRole).required(),
    },
  }),
  ensureAuthenticated,
  updateMemberRolesController.update,
);

export default membersRoutes;
