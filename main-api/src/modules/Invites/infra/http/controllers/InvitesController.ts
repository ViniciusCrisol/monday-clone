import { Request, Response } from 'express';
import { container } from 'tsyringe';

import InviteMemberService from '@modules/Invites/services/InviteMemberService';
import ListInvitesService from '@modules/Invites/services/ListInvitesService';

export default class InvitesController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { id: project_id } = request.params;
    const { id: account_id } = request.user;
    const { user_email } = request.body;

    const inviteMember = container.resolve(InviteMemberService);
    await inviteMember.execute({
      account_id,
      user_email,
      project_id,
    });

    return response.status(204).send();
  }

  public async list(request: Request, response: Response): Promise<Response> {
    const { id: account_id } = request.user;

    const listInvites = container.resolve(ListInvitesService);
    const invites = await listInvites.execute(account_id);

    const serializedInvites = invites.map(invite => ({
      ...invite,
      project: {
        id: invite.project.id,
        project_name: invite.project.project_name,
      },
    }));

    return response.json(serializedInvites);
  }
}
