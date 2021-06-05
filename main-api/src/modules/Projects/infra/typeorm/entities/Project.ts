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
import Member from '@modules/Members/infra/typeorm/entities/Member';
import Account from '@modules/Accounts/infra/typeorm/entities/Account';

@Entity('projects')
export default class Project {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 30 })
  project_name: string;

  @Column()
  account_id: string;

  @ManyToOne(() => Account)
  @JoinColumn({ name: 'account_id' })
  account: Account;

  @OneToMany(() => Member, member => member.project)
  members: Member[];

  @CreateDateColumn()
  inserted_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
