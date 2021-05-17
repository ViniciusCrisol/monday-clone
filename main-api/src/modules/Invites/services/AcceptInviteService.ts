import { inject, injectable } from 'tsyringe';

import memberRoles from '@utils/app/enums/memberRoles';
import AppError from '@shared/errors/AppError';
import IInvitesRepository from '../repositories/IInvitesRepository';
import IMembersRepository from '@modules/Members/repositories/IMembersRepository';
import IAccountsRepository from '@modules/Accounts/repositories/IAccountsRepository';
import IProjectsRepository from '@modules/Projects/repositories/IProjectsRepository';

interface IRequest {
  account_id: string;
  invite_id: string;
}

@injectable()
class AcceptInviteService {
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

  public async execute({ account_id, invite_id }: IRequest): Promise<void> {
    const invite = await this.invitesRepository.findById(invite_id);
    if (!invite) throw new AppError('invalidInvite');

    const account = await this.accountsRepository.findById(account_id);
    if (!account) throw new AppError('invalidAccount');

    if (invite.account_id !== account_id)
      throw new AppError('permissionDenied');

    const project = await this.projectsRepository.findById(invite.project_id);
    if (!project) throw new AppError('projectNotFounded');

    if (invite.account_id !== account_id)
      throw new AppError('mustBeProjectOwner');

    await this.membersRepository.create({
      account_id: account_id,
      project_id: project.id,
      role: memberRoles.STANDARD_MEMBER,
    });

    await this.invitesRepository.deleteById(invite_id);
  }
}

export default AcceptInviteService;
