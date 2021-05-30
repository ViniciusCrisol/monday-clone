import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';
import ProjectsController from '../controllers/ProjectsController';
import ProjectPermissionsController from '../controllers/ProjectPermissionsController';

const projectsRoutes = Router();
const projectsController = new ProjectsController();
const projectPermissionsController = new ProjectPermissionsController();

projectsRoutes.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      project_name: Joi.string().required(),
    },
  }),
  ensureAuthenticated,
  projectsController.create,
);

projectsRoutes.get('/', ensureAuthenticated, projectsController.list);

projectsRoutes.get('/:id', ensureAuthenticated, projectsController.get);

projectsRoutes.get(
  '/permission/:id',
  ensureAuthenticated,
  projectPermissionsController.get,
);

export default projectsRoutes;
