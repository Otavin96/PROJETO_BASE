import { dataSource } from '@/common/infrastructure/typeorm'
import { container } from 'tsyringe'
import { Food } from '../typeorm/entities/foods.entity'
import { CreateFoodsUseCase } from '@/foods/application/usecases/create-foods.usecase'
import { FoodsTypeormRepository } from '../typeorm/repositories/foods-typeorm.repository'
import { GetFoodsUseCase } from '@/foods/application/usecases/get-foods.usecase'
import { UpdateFoodsUseCase } from '@/foods/application/usecases/update-foods.usecase'
import { DeleteFoodsUseCase } from '@/foods/application/usecases/delete-foods.usecase'

container.registerSingleton('FoodsRepository', FoodsTypeormRepository)

container.registerInstance(
  'FoodsDefaultTypeormRepository',
  dataSource.getRepository(Food),
)

container.registerSingleton('CreateFoodsUseCase', CreateFoodsUseCase.UseCase)
container.registerSingleton('GetFoodsUseCase', GetFoodsUseCase.UseCase)
container.registerSingleton('UpdateFoodsUseCase', UpdateFoodsUseCase.UseCase)
container.registerSingleton('DeleteFoodsUseCase', DeleteFoodsUseCase.UseCase)
