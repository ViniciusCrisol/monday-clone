import { Request, Response } from 'express';
import { container } from 'tsyringe';
import GetProjecetPermission from '@modules/Projects/services/GetProjecetPermission';

export default class ProjectPermissionsController {
  public async get(request: Request, response: Response): Promise<Response> {
    const { id: account_id } = request.user;
    const { id: project_id } = request.params;

    const getPermission = container.resolve(GetProjecetPermission);
    const permission = await getPermission.execute({ project_id, account_id });
    return response.json({ role: permission });
  }
}
