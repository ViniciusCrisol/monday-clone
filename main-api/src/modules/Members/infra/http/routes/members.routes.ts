import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import validuateMemberRole from '@utils/validations/validuateMemberRole';
import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';
import UpdateMemberRolesController from '../controllers/UpdateMemberRolesController';

const membersRoutes = Router();
const updateMemberRolesController = new UpdateMemberRolesController();

membersRoutes.patch(
  '/role/:id',
  celebrate({
    [Segments.PARAMS]: { id: Joi.string().uuid() },
    [Segments.BODY]: {
      role: Joi.string().regex(validuateMemberRole).required(),
    },
  }),
  ensureAuthenticated,
  updateMemberRolesController.update,
);

export default membersRoutes;
