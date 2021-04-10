import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import ProjectsController from '../controllers/ProjectsController';

const projectsRoutes = Router();
const projectsController = new ProjectsController();

projectsRoutes.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      project_name: Joi.string().required(),
    },
  }),
  projectsController.create,
);

export default projectsRoutes;
