import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';
import GroupsController from '../controllers/GroupsController';

const groupRoutes = Router();
const groupsController = new GroupsController();

groupRoutes.post(
  '/:id',
  // celebrate({
  //   [Segments.BODY]: {
  //     project_name: Joi.string().required(),
  //   },
  // }),
  ensureAuthenticated,
  groupsController.create,
);

groupRoutes.get(
  '/:id',
  // celebrate({
  //   [Segments.BODY]: {
  //     project_name: Joi.string().required(),
  //   },
  // }),
  ensureAuthenticated,
  groupsController.get,
);

export default groupRoutes;
