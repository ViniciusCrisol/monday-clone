import { Request, Response } from 'express';
import { container } from 'tsyringe';

import memberRoles from '@utils/enums/memberRoles';
import UpdateMemberRoleService from '@modules/Members/services/UpdateMemberRoleService';

export default class UpdateMemberRolesController {
  public async update(request: Request, response: Response): Promise<Response> {
    const { role }: { role: keyof typeof memberRoles } = request.body;
    const { id: member_id } = request.params;
    const { id: account_id } = request.user;

    const updateRole = container.resolve(UpdateMemberRoleService);
    await updateRole.execute({ member_id, role, account_id });
    return response.status(204).send();
  }
}
