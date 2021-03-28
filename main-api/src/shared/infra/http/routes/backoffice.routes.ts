import { Router } from 'express';
import backofficeRequest from 'request';
import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';

const backofficeRouter = Router();

backofficeRouter.post(
  '/pdf/create/:template',
  ensureAuthenticated,
  async (request, response) => {
    const { id } = request.user;
    const { template } = request.params;

    backofficeRequest({
      method: 'POST',
      json: { template },
      url: `${process.env.SECONDARY_API_URL}/pdf/create/${id}`,
    }).pipe(response);
  },
);

export default backofficeRouter;
