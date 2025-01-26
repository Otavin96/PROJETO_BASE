import { dataSource } from '@/common/infrastructure/typeorm'
import { container } from 'tsyringe'
import { Meal } from '../typeorm/entities/meals.entities'
import { MealsTypeormRepository } from '../typeorm/repositories/meals-typeorm.repository'
import { CreateMealsUseCase } from '@/meals/application/usecases/create-meals.usecase'
import { GetMealsUseCase } from '@/meals/application/usecases/get-meals.usecase'
import { UpdateMealsUseCase } from '@/meals/application/usecases/update-meals.usecase'
import { DeleteMealsUseCase } from '@/meals/application/usecases/delete-meals.usecase'

container.registerSingleton('MealsRepository', MealsTypeormRepository)

container.registerInstance(
  'MealsDefaultTypeormRepository',
  dataSource.getRepository(Meal),
)

container.registerSingleton('CreateMealsUseCase', CreateMealsUseCase.UseCase)
container.registerSingleton('GetMealsUseCase', GetMealsUseCase.UseCase)
container.registerSingleton('UpdateMealsUseCase', UpdateMealsUseCase.UseCase)
container.registerSingleton('DeleteMealsUseCase', DeleteMealsUseCase.UseCase)
