import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { UserModel, StatusPermission } from '../../../domain/models/users.model'

@Entity('users')
export class User implements UserModel {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  name: string

  @Column()
  email: string

  @Column()
  password: string

  @Column({ nullable: true })
  avatar?: string

  @Column({ type: 'enum', enum: StatusPermission })
  roles: StatusPermission

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}
