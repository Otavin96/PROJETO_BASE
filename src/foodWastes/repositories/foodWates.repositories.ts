import { RepositoryInterface } from '@/common/domain/repositories/repository.interface'
import { FoodsPerMeal } from '@/foodsPerMeals/infrastructure/typeorm/entities/foods-per-meals.entities'
import { Meal } from '@/meals/infrastructure/typeorm/entities/meals.entities'
import { FoodWasteModel } from '../domain/models/foodWaste.model'

export interface CreateFoodWasteProps {
  meal_id: Meal
  food_per_meal_id: FoodsPerMeal
  waste_quantity: number
}

export interface FoodWastesRepository
  extends RepositoryInterface<FoodWasteModel, CreateFoodWasteProps> {
  //   calculateWaste(): Promise<void>
}
