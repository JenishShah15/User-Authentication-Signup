import { User } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User_Sessions {
  @PrimaryGeneratedColumn('uuid')
  session_id!: string;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  user!: User;

  @Column({ type: 'timestamp' })
  login_time!: Date;

  @Column({ type: 'enum', enum: ['ACTIVE', 'LOGGED_OUT', 'FAILED'] })
  login_status!: string;

  @Column({ length: 255, nullable: true })
  jwt_token!: string;

  @CreateDateColumn()
  created_at!: Date;
}
