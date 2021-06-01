import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import Invite from '@modules/Invites/infra/typeorm/entities/Invite';
import InvitesRepository from '@modules/Invites/infra/typeorm/repositories/InvitesRepository';
import MembersRepository from '@modules/Members/infra/typeorm/repositories/MembersRepository';
import AccountsRepository from '@modules/Accounts/infra/typeorm/repositories/AccountsRepository';
import ProjectsRepository from '@modules/Projects/infra/typeorm/repositories/ProjectsRepository';

interface IRequest {
  user_email: string;
  account_id: string;
  project_id: string;
}

@injectable()
export default class InviteMemberService {
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

  public async execute({
    user_email,
    account_id,
    project_id,
  }: IRequest): Promise<Invite> {
    const account = await this.accountsRepository.findById(account_id);
    if (!account) throw new AppError('invalidAccount');
    if (account.user_email === user_email) throw new AppError('invalidInvite');

    const invitedUser = await this.accountsRepository.findByEmail(user_email);
    if (!invitedUser) throw new AppError('invalidAccount');

    const project = await this.projectsRepository.findById(project_id);
    if (!project) throw new AppError('projectNotFounded');
    if (project.account_id !== account_id)
      throw new AppError('mustBeProjectOwner');

    const inviteAlreadySended = await this.invitesRepository.findByProjectId({
      account_id: invitedUser.id,
      project_id,
    });
    if (inviteAlreadySended) throw new AppError('inviteAlreadySended');

    const memberAlreadyInProject = await this.membersRepository.findByProjectId(
      { account_id, project_id },
    );
    if (memberAlreadyInProject) throw new AppError('invalidInvite');

    const invite = await this.invitesRepository.create({
      account_id: invitedUser.id,
      project_id,
    });
    return invite;
  }
}
