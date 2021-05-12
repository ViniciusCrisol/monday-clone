import { inject, injectable } from 'tsyringe';

import {
  projectOwner,
  inviteSended,
  invalidInvite,
  invalidAccount,
  projectNotFount,
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
    const account = await this.accountsRepository.findById(account_id);
    if (!account) {
      throw new AppError(invalidAccount.message);
    }

    if (account.user_email === user_email) {
      throw new AppError(invalidInvite.message);
    }

    const invitedUser = await this.accountsRepository.findByEmail(user_email);
    if (!invitedUser) {
      throw new AppError(invalidAccount.message);
    }

    const project = await this.projectsRepository.findById(project_id);
    if (!project) {
      throw new AppError(projectNotFount.message);
    }

    if (project.account_id !== account_id) {
      throw new AppError(projectOwner.message);
    }

    const inviteAlreadySended = await this.invitesRepository.findByProjectId({
      account_id: invitedUser.id,
      project_id,
    });
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
