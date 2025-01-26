import { FoodsPerMeal } from '@/foodsPerMeals/infrastructure/typeorm/entities/foods-per-meals.entities'
import { DayOfWeek } from '@/meals/domain/models/meals.model'

export type MealsOutput = {
  id: string
  day_of_week: DayOfWeek
  date: Date
  created_at: Date
  updated_at: Date
}
