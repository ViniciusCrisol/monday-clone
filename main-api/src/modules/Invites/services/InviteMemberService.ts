import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import Invite from '../infra/typeorm/entities/Invite';
import IInvitesRepository from '../repositories/IInvitesRepository';
import IAccountsRepository from '@modules/Accounts/repositories/IAccountsRepository';
import IProjectsRepository from '@modules/Projects/repositories/IProjectsRepository';
import IMembersRepository from '@modules/Members/repositories/IMembersRepository';

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

    @inject('MembersRepository')
    private membersRepository: IMembersRepository,
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
      {
        account_id,
        project_id,
      },
    );
    if (memberAlreadyInProject) throw new AppError('invalidInvite');

    const invite = await this.invitesRepository.create({
      account_id: invitedUser.id,
      project_id,
    });
    return invite;
  }
}

export default InviteMemberService;
