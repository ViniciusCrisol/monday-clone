import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import Account from '@modules/Accounts/infra/typeorm/entities/Account';

@Entity('accounts')
class Project {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 30 })
  project_name: string;

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

export default Project;
