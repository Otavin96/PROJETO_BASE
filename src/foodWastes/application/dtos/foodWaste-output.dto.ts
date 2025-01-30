import { FoodsPerMeal } from '@/foodsPerMeals/infrastructure/typeorm/entities/foods-per-meals.entities'
import { Meal } from '@/meals/infrastructure/typeorm/entities/meals.entities'

export interface FoodWasteOutput {
  id: string
  meal_id: Meal
  food_per_meal_id: FoodsPerMeal
  waste_quantity: number
  created_at: Date
  updated_at: Date
}
