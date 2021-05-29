import { inject, injectable } from 'tsyringe';

import memberRoles from '@utils/app/enums/memberRoles';
import AppError from '@shared/errors/AppError';
import InvitesRepository from '@modules/Invites/infra/typeorm/repositories/InvitesRepository';
import MembersRepository from '@modules/Members/infra/typeorm/repositories/MembersRepository';
import AccountsRepository from '@modules/Accounts/infra/typeorm/repositories/AccountsRepository';
import ProjectsRepository from '@modules/Projects/infra/typeorm/repositories/ProjectsRepository';

interface IRequest {
  account_id: string;
  invite_id: string;
}

@injectable()
class AcceptInviteService {
  constructor(
    @inject('InvitesRepository')
    private invitesRepository: InvitesRepository,

    @inject('MembersRepository')
    private membersRepository: MembersRepository,

    @inject('ProjectsRepository')
    private projectsRepository: ProjectsRepository,

    @inject('AccountsRepository')
    private accountsRepository: AccountsRepository,
  ) {}

  public async execute({ account_id, invite_id }: IRequest): Promise<void> {
    const invite = await this.invitesRepository.findById(invite_id);
    if (!invite) throw new AppError('invalidInvite');

    const account = await this.accountsRepository.findById(account_id);
    if (!account) throw new AppError('invalidAccount');

    if (invite.account_id !== account_id)
      throw new AppError('permissionDenied');

    const project = await this.projectsRepository.findById(invite.project_id);
    if (!project) throw new AppError('projectNotFounded');

    const memberAlreadyInProject = await this.membersRepository.findByProjectId(
      {
        account_id,
        project_id: invite.project_id,
      },
    );
    if (memberAlreadyInProject) throw new AppError('invalidInvite');

    await this.membersRepository.create({
      account_id: account_id,
      project_id: project.id,
      role: memberRoles.STANDARD_MEMBER,
    });

    await this.invitesRepository.deleteById(invite_id);
  }
}

export default AcceptInviteService;
