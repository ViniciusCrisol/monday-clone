import { Request, Response } from 'express';
import { container } from 'tsyringe';
import InviteMemberService from '@modules/Projects/services/InviteMemberService';
import ListInvitesService from '@modules/Projects/services/ListInvitesService';

export default class InvitesController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { id: account_id } = request.user;
    const { user_email, project_id } = request.body;

    const inviteMember = container.resolve(InviteMemberService);
    await inviteMember.execute({
      account_id,
      user_email,
      project_id,
    });

    return response.status(204).send();
  }

  public async get(request: Request, response: Response): Promise<Response> {
    const { id: account_id } = request.user;

    const listInvites = container.resolve(ListInvitesService);
    const invites = await listInvites.execute(account_id);

    return response.json(invites);
  }
}
