import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Project from '@modules/Projects/infra/typeorm/entities/Project';

@Entity('groups')
export default class Group {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 30 })
  group_name: string;

  @Column()
  leader_id: string;

  @Column()
  project_id: string;

  @ManyToOne(() => Project)
  @JoinColumn({ name: 'project_id' })
  project: Project;

  @CreateDateColumn()
  inserted_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
