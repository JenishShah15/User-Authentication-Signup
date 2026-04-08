import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import {User_Sessions} from '../../session/entities/session.entity'
import { roles } from 'src/common/roles';





@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ length: 100 })
  name!: string;

  @Column()
  age!: number;

  @Column()
  country!: string;

  @Column({ unique: true })
  phone!: string;

  @Column({ unique: true })
  email!: string;

  @Column({ select: false })
  password!: string;

  @OneToMany(()=>User_Sessions,session=> session.user)
  sessions! : User_Sessions[]

  @Column({type:'enum',enum:roles,default:roles.USER})
  role : roles
 

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;
}
