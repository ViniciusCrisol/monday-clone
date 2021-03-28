import { Router } from 'express';

import pdfController from './app/controllers/PdfController';
import emailController from './app/controllers/EmailController';

const routes = Router();

routes.get('/pdf/:data', pdfController.get);
routes.post('/pdf/create/:id', pdfController.create);
routes.post('/send/email/:id', emailController.create);

export default routes;
