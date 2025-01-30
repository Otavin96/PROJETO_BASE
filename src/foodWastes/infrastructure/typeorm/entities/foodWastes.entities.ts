import { FoodsPerMeal } from '@/foodsPerMeals/infrastructure/typeorm/entities/foods-per-meals.entities'
import { FoodWasteModel } from '@/foodWastes/domain/models/foodWaste.model'
import { Meal } from '@/meals/infrastructure/typeorm/entities/meals.entities'
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

@Entity('food_waste')
export class FoodWaste implements FoodWasteModel {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @ManyToOne(() => Meal, (meal) => meal.foodWaste)
  @JoinColumn({ name: 'meal_id' })
  meal_id: Meal

  @ManyToOne(() => FoodsPerMeal, (foodsPerMeal) => foodsPerMeal.FoodWaste)
  @JoinColumn({ name: 'food_per_meal_id' })
  food_per_meal_id: FoodsPerMeal

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  waste_quantity: number

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}
