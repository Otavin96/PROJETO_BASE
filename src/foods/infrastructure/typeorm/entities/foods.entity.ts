import { FoodModel } from '@/foods/domain/models/foods.model'
import { Supplier } from '@/suppliers/infrastructure/typeorm/entities/suppliers.entities'
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

@Entity('foods')
export class Food implements FoodModel {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  name: string

  @Column()
  quantity: number

  @Column('decimal', { precision: 10, scale: 2 })
  price: number

  @ManyToOne(() => Supplier, (supplier) => supplier.food, { nullable: true })
  @JoinColumn({ name: 'supplier_id' })
  supplier_id: Supplier

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
  foodsPerMeals: any
}
