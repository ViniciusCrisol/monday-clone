import { Request, Response } from 'express';
import { container } from 'tsyringe';
import DeclineInviteService from '@modules/Invites/services/DeclineInviteService';

export default class InvitesController {
  public async decline(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { id: account_id } = request.user;
    const { id: invite_id } = request.params;

    const declineInvite = container.resolve(DeclineInviteService);
    await declineInvite.execute({
      account_id,
      invite_id,
    });

    return response.status(204).send();
  }
}
