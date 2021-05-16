import ICreateMemberDTO from '../dtos/ICreateMemberDTO';
import Member from '../infra/typeorm/entities/Member';

export default interface IMembersRepository {
  create(data: ICreateMemberDTO): Promise<Member>;
  findById(id: string): Promise<Member | undefined>;
}
