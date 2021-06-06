import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import Invite from '@modules/Invites/infra/typeorm/entities/Invite';
import AccountsRepository from '@modules/Accounts/infra/typeorm/repositories/AccountsRepository';
import InvitesRepository from '@modules/Invites/infra/typeorm/repositories/InvitesRepository';
import MembersRepository from '@modules/Members/infra/typeorm/repositories/MembersRepository';
import ProjectsRepository from '@modules/Projects/infra/typeorm/repositories/ProjectsRepository';

interface IRequest {
  user_email: string;
  account_id: string;
  project_id: string;
}

@injectable()
export default class InviteMemberService {
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

  public async execute({
    user_email,
    account_id,
    project_id,
  }: IRequest): Promise<Invite> {
    const [account, project, invitedUser] = await Promise.all([
      this.accountsRepository.findById(account_id),
      this.projectsRepository.findById(project_id),
      this.accountsRepository.findByEmail(user_email),
    ]);

    if (!account) throw new AppError('invalidAccount');
    if (account.user_email === user_email) throw new AppError('invalidInvite');

    if (!project) throw new AppError('projectNotFounded');
    if (project.account_id !== account_id) throw new AppError('mustBeOwner');

    if (!invitedUser) throw new AppError('invalidAccount');

    const [inviteAlreadySended, memberAlreadyInProject] = await Promise.all([
      this.invitesRepository.findByAccountAndProjectId({
        account_id: invitedUser.id,
        project_id,
      }),
      this.membersRepository.findByAccountAndProjectId({
        account_id,
        project_id,
      }),
    ]);

    if (inviteAlreadySended) throw new AppError('inviteAlreadySended');
    if (memberAlreadyInProject) throw new AppError('invalidInvite');

    const invite = await this.invitesRepository.create({
      account_id: invitedUser.id,
      project_id,
    });
    return invite;
  }
}
