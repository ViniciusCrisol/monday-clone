import { inject, injectable } from 'tsyringe';

import memberRoles from '@utils/enums/memberRoles';
import AppError from '@shared/errors/AppError';
import MembersRepository from '@modules/Members/infra/typeorm/repositories/MembersRepository';
import AccountsRepository from '@modules/Accounts/infra/typeorm/repositories/AccountsRepository';
import ProjectsRepository from '@modules/Projects/infra/typeorm/repositories/ProjectsRepository';

interface IRequest {
  role: keyof typeof memberRoles;
  member_id: string;
  account_id: string;
}

@injectable()
export default class UpdateMemberRoleService {
  constructor(
    @inject('AccountsRepository')
    private accountsRepository: AccountsRepository,

    @inject('ProjectsRepository')
    private projectsRepository: ProjectsRepository,

    @inject('MembersRepository')
    private membersRepository: MembersRepository,
  ) {}

  public async execute({
    role,
    member_id,
    account_id,
  }: IRequest): Promise<void> {
    const [member, account] = await Promise.all([
      this.membersRepository.findById(member_id),
      this.accountsRepository.findById(account_id),
    ]);

    if (!member) throw new AppError('invalidMember');
    if (!account) throw new AppError('invalidAccount');

    const project = await this.projectsRepository.findById(member.project_id);
    if (!project) throw new AppError('projectNotFounded');

    if (project.account_id !== account.id) {
      const accountMemberProject =
        await this.membersRepository.findByAccountAndProjectId({
          account_id,
          project_id: member.project_id,
        });

      if (
        !accountMemberProject ||
        accountMemberProject.role !== memberRoles.PROJECT_LEADER
      )
        throw new AppError('notAllowed');
    }

    if (member.role === memberRoles[role]) return;
    await this.membersRepository.save({
      ...member,
      role: memberRoles[role],
    });
  }
}
