import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';
import GroupsController from '../controllers/GroupsController';

const projectsRoutes = Router();
const groupsController = new GroupsController();

projectsRoutes.post(
  '/',
  // celebrate({
  //   [Segments.BODY]: {
  //     project_name: Joi.string().required(),
  //   },
  // }),
  ensureAuthenticated,
  groupsController.create,
);

export default projectsRoutes;
