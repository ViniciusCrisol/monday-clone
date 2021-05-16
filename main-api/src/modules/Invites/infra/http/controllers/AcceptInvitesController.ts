import { Request, Response } from 'express';
import { container } from 'tsyringe';
import AcceptInviteService from '@modules/Invites/services/AcceptInviteService';

export default class AcceptInvitesController {
  public async accept(request: Request, response: Response): Promise<Response> {
    const { id: account_id } = request.user;
    const { id: invite_id } = request.params;

    const declineInvite = container.resolve(AcceptInviteService);
    await declineInvite.execute({
      account_id,
      invite_id,
    });

    return response.status(204).send();
  }
}
