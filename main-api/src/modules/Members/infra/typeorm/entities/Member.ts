import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Account from '@modules/Accounts/infra/typeorm/entities/Account';
import Project from '@modules/Projects/infra/typeorm/entities/Project';

@Entity('members')
export default class Member {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  role: number;

  @Column()
  project_id: string;

  @ManyToOne(() => Project)
  @JoinColumn({ name: 'project_id' })
  project: Project;

  @Column()
  account_id: string;

  @ManyToOne(() => Account)
  @JoinColumn({ name: 'account_id' })
  account: Account;

  @CreateDateColumn()
  inserted_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
