import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';
import UpdateMemberRoleController from '../controllers/updateMemberRoleController';
import memberRoles from '@utils/enums/memberRoles';

const membersRoutes = Router();
const updateMemberRoleController = new UpdateMemberRoleController();

membersRoutes.patch(
  '/role/:id',
  celebrate({
    [Segments.BODY]: {
      role: Joi.string()
        .regex(
          RegExp(
            String(
              '(' +
                Object.keys(memberRoles).map(memberRole => memberRole) +
                ')',
            ).replace(/,/g, '|'),
          ),
        )
        .required(),
    },
  }),
  ensureAuthenticated,
  updateMemberRoleController.update,
);

export default membersRoutes;
