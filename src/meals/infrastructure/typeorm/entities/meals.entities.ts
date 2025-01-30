import { FoodsPerMeal } from '@/foodsPerMeals/infrastructure/typeorm/entities/foods-per-meals.entities'
import { FoodWaste } from '@/foodWastes/infrastructure/typeorm/entities/foodWastes.entities'
import { DayOfWeek, MealsModel } from '@/meals/domain/models/meals.model'
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

@Entity('meals')
export class Meal implements MealsModel {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ type: 'enum', enum: DayOfWeek })
  day_of_week: DayOfWeek

  @Column()
  date: Date

  @OneToMany(() => FoodsPerMeal, (foodsPerMeal) => foodsPerMeal.meal_id)
  foodsPerMeal: FoodsPerMeal[]

  @OneToMany(() => FoodWaste, (foodWaste) => foodWaste.meal_id)
  foodWaste: FoodWaste[]

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}
