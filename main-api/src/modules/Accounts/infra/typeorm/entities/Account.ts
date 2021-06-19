import Project from '@modules/Projects/infra/typeorm/entities/Project';
import {
  Entity,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('accounts')
export default class Account {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  user_name: string;

  @Column()
  user_email: string;

  @Column()
  account_name: string;

  @OneToMany(() => Project, project => project.account)
  projects: Project[];

  @Column()
  password_hash: string;

  @CreateDateColumn()
  inserted_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
