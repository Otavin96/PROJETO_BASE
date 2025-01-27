import { dataSource } from '@/common/infrastructure/typeorm'
import { container } from 'tsyringe'
import { FoodsPerMeal } from '../typeorm/entities/foods-per-meals.entities'
import { FoodsPerMealsTypeormRepository } from '../typeorm/repositories/foodsPerMaels-typeorm.repository'
import { CreateFoodsPerMealsUseCase } from '@/foodsPerMeals/application/usecases/create-foodsPerMael.usecase'
import { GetFoodsPerMealsUseCase } from '@/foodsPerMeals/application/usecases/get-foodsPerMeal.usecase'
import { DeleteFoodsPerMealsUseCase } from '@/foodsPerMeals/application/usecases/delete-foodsPerMeal.usecase'
import { UpdateFoodsPerMealsUseCase } from '@/foodsPerMeals/application/usecases/update-foodsPerMael.usecase'

container.registerSingleton(
  'FoodsPerMealsRepository',
  FoodsPerMealsTypeormRepository,
)

container.registerInstance(
  'FoodsPerMealsDefaultTypeormRepository',
  dataSource.getRepository(FoodsPerMeal),
)

container.registerSingleton(
  'CreateFoodsPerMealsUseCase',
  CreateFoodsPerMealsUseCase.UseCase,
)

container.registerSingleton(
  'GetFoodsPerMealsUseCase',
  GetFoodsPerMealsUseCase.UseCase,
)

container.registerSingleton(
  'UpdateFoodsPerMealsUseCase',
  UpdateFoodsPerMealsUseCase.UseCase,
)

container.registerSingleton(
  'DeleteFoodsPerMealsUseCase',
  DeleteFoodsPerMealsUseCase.UseCase,
)
