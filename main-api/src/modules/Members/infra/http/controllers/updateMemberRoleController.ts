import { Request, Response } from 'express';
import { container } from 'tsyringe';
import UpdateMemberRoleService from '@modules/Members/services/UpdateMemberRoleService';

export default class ProjectPermissionsController {
  public async update(request: Request, response: Response): Promise<Response> {
    const { role } = request.body;
    const { id: member_id } = request.params;

    const updateRole = container.resolve(UpdateMemberRoleService);
    await updateRole.execute({ member_id, role });
    return response.status(204).send();
  }
}
