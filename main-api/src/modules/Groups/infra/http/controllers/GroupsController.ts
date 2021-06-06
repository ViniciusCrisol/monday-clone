import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateGroupService from '@modules/Groups/services/CreateGroupService';
import ListGroupsService from '@modules/Groups/services/ListGroupsService';

export default class GroupsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { group_name } = request.body;
    const { id: account_id } = request.user;
    const { id: project_id } = request.params;

    const createGroup = container.resolve(CreateGroupService);
    const group = await createGroup.execute({
      account_id,
      project_id,
      group_name,
    });
    return response.json(group);
  }

  public async get(request: Request, response: Response): Promise<Response> {
    const { id: account_id } = request.user;
    const { id: project_id } = request.params;

    const listGroups = container.resolve(ListGroupsService);
    const groups = await listGroups.execute({
      account_id,
      project_id,
    });
    return response.json(groups);
  }
}
