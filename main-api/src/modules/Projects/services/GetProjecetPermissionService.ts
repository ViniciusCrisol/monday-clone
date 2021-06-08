import { inject, injectable } from 'tsyringe';

import memberRoles from '@utils/enums/memberRoles';
import AppError from '@shared/errors/AppError';
import AccountsRepository from '@modules/Accounts/infra/typeorm/repositories/AccountsRepository';
import MembersRepository from '@modules/Members/infra/typeorm/repositories/MembersRepository';
import ProjectsRepository from '@modules/Projects/infra/typeorm/repositories/ProjectsRepository';

interface IRequest {
  project_id: string;
  account_id: string;
}

@injectable()
export default class GetProjecetPermissionService {
  constructor(
    @inject('AccountsRepository')
    private accountsRepository: AccountsRepository,

    @inject('MembersRepository')
    private membersRepository: MembersRepository,

    @inject('ProjectsRepository')
    private projectsRepository: ProjectsRepository,
  ) {}

  public async execute({ project_id, account_id }: IRequest): Promise<number> {
    const [account, project, members] = await Promise.all([
      this.accountsRepository.findById(account_id),
      this.projectsRepository.findById(project_id),
      this.membersRepository.listByProjectId(project_id),
    ]);

    if (!account) throw new AppError('invalidAccount');
    if (!project) throw new AppError('invalidProject');
    if (project.account_id !== account_id) throw new AppError('notAllowed');

    const member = members.find(member => member.account_id === account_id);
    if (member) return member.role;

    return memberRoles.PROJECT_LEADER;
  }
}
