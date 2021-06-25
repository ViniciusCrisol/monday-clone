import {
  Entity,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Account from '@modules/Accounts/infra/typeorm/entities/Account';
import Group from '@modules/Groups/infra/typeorm/entities/Group';
import Member from '@modules/Members/infra/typeorm/entities/Member';

@Entity('projects')
export default class Project {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  project_name: string;

  @Column()
  account_id: string;

  @ManyToOne(() => Account)
  @JoinColumn({ name: 'account_id' })
  account: Account;

  @OneToMany(() => Group, group => group.project)
  groups: Group[];

  @OneToMany(() => Member, member => member.project)
  members: Member[];

  @CreateDateColumn()
  inserted_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
