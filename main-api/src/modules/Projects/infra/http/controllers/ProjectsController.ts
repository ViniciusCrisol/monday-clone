import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateProjectService from '@modules/Projects/services/CreateProjectService';

export default class AccountsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;
    const { project_name } = request.body;

    const createProject = container.resolve(CreateProjectService);
    const project = await createProject.execute({
      account_id: id,
      project_name,
    });
    return response.json(project);
  }
}
