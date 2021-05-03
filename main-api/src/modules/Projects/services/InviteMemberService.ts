import { inject, injectable } from 'tsyringe';

import {
  projectOwner,
  inviteSended,
  invalidAccount,
  nameAlreadyInUse,
} from '@shared/errors/messages';
import AppError from '@shared/errors/AppError';
import Invite from '../infra/typeorm/entities/Invite';
import IInvitesRepository from '../repositories/IInvitesRepository';
import IProjectsRepository from '../repositories/IProjectsRepository';
import IAccountsRepository from '@modules/Accounts/repositories/IAccountsRepository';

interface IRequest {
  user_email: string;
  account_id: string;
  project_id: string;
}

@injectable()
class InviteMemberService {
  constructor(
    @inject('ProjectsRepository')
    private projectsRepository: IProjectsRepository,

    @inject('AccountsRepository')
    private accountsRepository: IAccountsRepository,

    @inject('InvitesRepository')
    private invitesRepository: IInvitesRepository,
  ) {}

  public async execute({
    user_email,
    account_id,
    project_id,
  }: IRequest): Promise<Invite> {
    const invitedUser = await this.accountsRepository.findByEmail(user_email);
    if (!invitedUser) {
      throw new AppError(invalidAccount.message);
    }

    const project = await this.projectsRepository.findById(project_id);
    if (!project) {
      throw new AppError(nameAlreadyInUse.message);
    }

    if (project.account_id !== account_id) {
      throw new AppError(projectOwner.message);
    }

    const inviteAlreadySended = await this.invitesRepository.findByAccountIdAndProjectId(
      { account_id: invitedUser.id, project_id },
    );
    if (inviteAlreadySended) {
      throw new AppError(inviteSended.message);
    }

    const invite = await this.invitesRepository.create({
      account_id: invitedUser.id,
      project_id,
    });
    return invite;
  }
}

export default InviteMemberService;
