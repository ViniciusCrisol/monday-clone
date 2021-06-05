import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Group from '@modules/Groups/infra/typeorm/entities/Group';
import Member from '@modules/Members/infra/typeorm/entities/Member';

@Entity('member_groups')
export default class MemberGroup {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  group_id: string;

  @ManyToOne(() => Group)
  @JoinColumn({ name: 'group_id' })
  group: Group;

  @Column()
  member_id: string;

  @ManyToOne(() => Member)
  @JoinColumn({ name: 'member_id' })
  member: Member;

  @CreateDateColumn()
  inserted_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
