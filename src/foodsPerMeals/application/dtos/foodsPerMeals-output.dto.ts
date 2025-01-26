import { Food } from '@/foods/infrastructure/typeorm/entities/foods.entity'
import { Meal } from '@/meals/infrastructure/typeorm/entities/meals.entities'

export type FoodsPerMealsOutput = {
  id: string
  food_id: Food
  meal_id: Meal
  quantity: number
  created_at: Date
  updated_at: Date
}
