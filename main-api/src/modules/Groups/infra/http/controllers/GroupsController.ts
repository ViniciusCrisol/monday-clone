import { Request, Response } from 'express';
import { container } from 'tsyringe';
// import CreateProjectService from '@modules/Projects/services/CreateProjectService';

export default class GroupsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { id: account_id } = request.user;
    const { project_name } = request.body;

    // const createProject = container.resolve(CreateProjectService);
    // const { id } = await createProject.execute({
    //   account_id,
    //   project_name,
    // });
    return response.status(204).send();
  }
}
