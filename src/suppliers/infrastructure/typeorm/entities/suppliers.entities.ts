import { Food } from '@/foods/infrastructure/typeorm/entities/foods.entity'
import { SupplierModel } from '@/suppliers/domain/models/suppliers.model'
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

@Entity('suppliers')
export class Supplier implements SupplierModel {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  name: string

  @Column()
  description: string

  @Column()
  email: string

  @Column()
  phone: string

  @OneToMany(() => Food, (food) => food.supplier_id)
  food: Food[]

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}
