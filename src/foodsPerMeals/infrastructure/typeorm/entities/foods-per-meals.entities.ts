import { Food } from '@/foods/infrastructure/typeorm/entities/foods.entity'
import { FoodsPerMealsModel } from '@/foodsPerMeals/domain/models/foods-per-meals.model'
import { FoodWaste } from '@/foodWastes/infrastructure/typeorm/entities/foodWastes.entities'
import { Meal } from '@/meals/infrastructure/typeorm/entities/meals.entities'
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

@Entity('foods_per_meals')
export class FoodsPerMeal implements FoodsPerMealsModel {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @ManyToOne(() => Food, (food) => food.foodsPerMeals, { nullable: true })
  @JoinColumn({ name: 'food_id' })
  food_id: Food

  @ManyToOne(() => Meal, (meal) => meal.foodsPerMeal, { nullable: true })
  @JoinColumn({ name: 'meal_id' })
  meal_id: Meal

  @OneToMany(() => FoodWaste, (FoodWaste) => FoodWaste.food_per_meal_id)
  FoodWaste: FoodWaste[]

  @Column('decimal', { precision: 10, scale: 2 })
  quantity: number

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}
