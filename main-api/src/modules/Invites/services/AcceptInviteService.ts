import { inject, injectable } from 'tsyringe';

import memberRoles from '@utils/enums/memberRoles';
import AppError from '@shared/errors/AppError';
import Member from '@modules/Members/infra/typeorm/entities/Member';
import AccountsRepository from '@modules/Accounts/infra/typeorm/repositories/AccountsRepository';
import InvitesRepository from '@modules/Invites/infra/typeorm/repositories/InvitesRepository';
import MembersRepository from '@modules/Members/infra/typeorm/repositories/MembersRepository';
import ProjectsRepository from '@modules/Projects/infra/typeorm/repositories/ProjectsRepository';

interface IRequest {
  account_id: string;
  invite_id: string;
}

@injectable()
export default class AcceptInviteService {
  constructor(
    @inject('AccountsRepository')
    private accountsRepository: AccountsRepository,

    @inject('InvitesRepository')
    private invitesRepository: InvitesRepository,

    @inject('MembersRepository')
    private membersRepository: MembersRepository,

    @inject('ProjectsRepository')
    private projectsRepository: ProjectsRepository,
  ) {}

  public async execute({ account_id, invite_id }: IRequest): Promise<Member> {
    const [invite, account] = await Promise.all([
      this.invitesRepository.findById(invite_id),
      this.accountsRepository.findById(account_id),
    ]);

    if (!invite) throw new AppError('invalidInvite');
    if (!account) throw new AppError('invalidAccount');
    if (invite.account_id !== account_id) throw new AppError('notAllowed');

    const [project, memberAlreadyInProject] = await Promise.all([
      this.projectsRepository.findById(invite.project_id),
      this.membersRepository.findByAccountAndProjectId({
        account_id,
        project_id: invite.project_id,
      }),
    ]);

    if (!project) throw new AppError('projectNotFounded');
    if (memberAlreadyInProject) throw new AppError('invalidInvite');

    this.invitesRepository.deleteById(invite_id);
    const member = await this.membersRepository.create({
      account_id: account_id,
      project_id: project.id,
      role: memberRoles.STANDARD_MEMBER,
    });
    return member;
  }
}
