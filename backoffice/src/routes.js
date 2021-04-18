import { Router } from 'express';

import documents from './app/controllers/DocumentsController';
import emailController from './app/controllers/EmailController';

const routes = Router();

routes.get('/documents/:data', documents.get);
routes.post('/documents/create/:id', documents.create);
routes.post('/send/email/:id', emailController.create);

export default routes;
