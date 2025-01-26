import { RepositoryInterface } from '@/common/domain/repositories/repository.interface'
import { FoodsPerMealsModel } from '../domain/models/foods-per-meals.model'
import { Food } from '@/foods/infrastructure/typeorm/entities/foods.entity'
import { Meal } from '@/meals/infrastructure/typeorm/entities/meals.entities'

export type CreateFoodsPerMealsProps = {
  food_id: Food
  meal_id: Meal
  quantity: number
}

export interface FoodsPerMealsRepository
  extends RepositoryInterface<FoodsPerMealsModel, CreateFoodsPerMealsProps> {}
