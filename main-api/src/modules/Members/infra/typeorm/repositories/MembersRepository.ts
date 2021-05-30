import { getRepository, Repository } from 'typeorm';

import IFindMemberByProjectIdDTO from '@modules/Members/dtos/IFindMemberByProjectIdDTO';
import ICreateMemberDTO from '@modules/Members/dtos/ICreateMemberDTO';
import Member from '@modules/Members/infra/typeorm/entities/Member';
import Project from '@modules/Projects/infra/typeorm/entities/Project';

class MembersRepository implements MembersRepository {
  private ormRepository: Repository<Member>;

  constructor() {
    this.ormRepository = getRepository(Member);
  }

  public async create(data: ICreateMemberDTO): Promise<Member> {
    const member = this.ormRepository.create(data);
    await this.ormRepository.save(member);
    return member;
  }

  public async count(account_id: string): Promise<number> {
    const response = await this.ormRepository.count({
      where: { account_id },
    });
    return response;
  }

  public async findProjects(account_id: string): Promise<Project[]> {
    const members = await this.ormRepository.find({
      select: ['id'],
      relations: ['project'],
      where: { account_id },
    });
    const response = members.map(member => member.project);
    return response;
  }

  public async findById(project_id: string): Promise<Member | undefined> {
    const response = await this.ormRepository.findOne(project_id);
    return response;
  }

  public async findByProjectId({
    account_id,
    project_id,
  }: IFindMemberByProjectIdDTO): Promise<Member | undefined> {
    const response = await this.ormRepository.findOne({
      where: {
        account_id,
        project_id,
      },
    });
    return response;
  }

  public async listByProjectId(project_id: string): Promise<Member[]> {
    const response = await this.ormRepository.find({
      where: { project_id },
    });
    return response;
  }
}

export default MembersRepository;
