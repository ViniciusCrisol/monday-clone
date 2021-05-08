import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import ProjectsController from '../controllers/ProjectsController';
import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';

const projectsRoutes = Router();
const projectsController = new ProjectsController();

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

projectsRoutes.get('/', ensureAuthenticated, projectsController.get);

export default projectsRoutes;
