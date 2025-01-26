import { dataSource } from '@/common/infrastructure/typeorm'
import { container } from 'tsyringe'
import { Food } from '../typeorm/entities/foods.entity'
import { CreateFoodsUseCase } from '@/foods/application/usecases/create-foods.usecase'
import { FoodsTypeormRepository } from '../typeorm/repositories/foods-typeorm.repository'

container.registerSingleton('FoodsRepository', FoodsTypeormRepository)

container.registerInstance(
  'FoodsDefaultTypeormRepository',
  dataSource.getRepository(Food),
)

container.registerSingleton('CreateFoodsUseCase', CreateFoodsUseCase.UseCase)
