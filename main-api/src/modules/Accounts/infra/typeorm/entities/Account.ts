import Project from '@modules/Projects/infra/typeorm/entities/Project';
import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';

@Entity('accounts')
class Account {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 60 })
  user_name: string;

  @Column({ length: 60 })
  user_email: string;

  @Column({ length: 60 })
  account_name: string;

  @OneToMany(type => Project, project => project.account)
  projects: Project[];

  @Column({ length: 60 })
  password_hash: string;

  @CreateDateColumn()
  inserted_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Account;
