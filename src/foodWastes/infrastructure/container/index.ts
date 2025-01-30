import { container } from 'tsyringe'
import { FoodWastesTypeormRepository } from '../typeorm/repositories/foodWastesTypeormRepository'
import { dataSource } from '@/common/infrastructure/typeorm'
import { FoodWaste } from '../typeorm/entities/foodWastes.entities'
import { CreateFoodWastesUseCase } from '@/foodWastes/application/usecases/create-foodwaste.usecase'
import { GetFoodWastesUseCase } from '@/foodWastes/application/usecases/get-foodWaste.usecase'
import { UpdateFoodWastesUseCase } from '@/foodWastes/application/usecases/update-foodWaste.usecase'
import { DeleteFoodWastesUseCase } from '@/foodWastes/application/usecases/delete-foodWaste.usecase'

container.registerSingleton('FoodWastesRepository', FoodWastesTypeormRepository)

container.registerInstance(
  'FoodWastesDefaultTypeormRepository',
  dataSource.getRepository(FoodWaste),
)

container.registerSingleton(
  'CreateFoodWastesUseCase',
  CreateFoodWastesUseCase.UseCase,
)

container.registerSingleton(
  'GetFoodWastesUseCase',
  GetFoodWastesUseCase.UseCase,
)

container.registerSingleton(
  'UpdateFoodWastesUseCase',
  UpdateFoodWastesUseCase.UseCase,
)

container.registerSingleton(
  'DeleteFoodWastesUseCase',
  DeleteFoodWastesUseCase.UseCase,
)
