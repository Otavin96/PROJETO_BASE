import { RepositoryInterface } from '@/common/domain/repositories/repository.interface'
import { DayOfWeek, MealsModel } from '../domain/models/meals.model'
import { FoodsPerMeal } from '@/foodsPerMeals/infrastructure/typeorm/entities/foods-per-meals.entities'

export type CreateMealsProps = {
  day_of_week: DayOfWeek
  date: Date
}

export interface MealsRepository
  extends RepositoryInterface<MealsModel, CreateMealsProps> {
  conflictingDate(date: Date): Promise<void>
}
