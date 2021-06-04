import { inject, injectable } from 'tsyringe';

import memberRoles from '@utils/enums/memberRoles';
import AppError from '@shared/errors/AppError';
import MembersRepository from '@modules/Members/infra/typeorm/repositories/MembersRepository';

interface IRequest {
  role: keyof typeof memberRoles;
  member_id: string;
}

@injectable()
export default class UpdateMemberRoleService {
  constructor(
    @inject('MembersRepository')
    private membersRepository: MembersRepository,
  ) {}

  public async execute({ role, member_id }: IRequest): Promise<void> {
    const member = await this.membersRepository.findById(member_id);
    if (!member) throw new AppError('invalidMember');

    this.membersRepository.save({
      ...member,
      role: memberRoles[role],
    });
  }
}
