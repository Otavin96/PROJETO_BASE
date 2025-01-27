import { container } from 'tsyringe'
import { Supplier } from '../typeorm/entities/suppliers.entities'
import { dataSource } from '@/common/infrastructure/typeorm'
import { SuppliersTypeormRepository } from '../typeorm/repositories/suppliers-typeorm.repository'
import { CreateSuppliersUseCase } from '@/suppliers/application/usecases/create-suppliers.usecase'
import { DeleteSuppliersUseCase } from '@/suppliers/application/usecases/delete-suppliers.usecase'
import { UpdateSuppliersUseCase } from '@/suppliers/application/usecases/update-suppliers.usecase'
import { GetSuppliersUseCase } from '@/suppliers/application/usecases/get-suppliers.usecase'

container.registerSingleton('SuppliersRepository', SuppliersTypeormRepository)

container.registerInstance(
  'SuppliersDefaultTypeormRepository',
  dataSource.getRepository(Supplier),
)

container.registerSingleton(
  'CreateSuppliersUseCase',
  CreateSuppliersUseCase.UseCase,
)

container.registerSingleton(
  'DeleteSuppliersUseCase',
  DeleteSuppliersUseCase.UseCase,
)

container.registerSingleton(
  'UpdateSuppliersUseCase',
  UpdateSuppliersUseCase.UseCase,
)

container.registerSingleton('GetSuppliersUseCase', GetSuppliersUseCase.UseCase)
