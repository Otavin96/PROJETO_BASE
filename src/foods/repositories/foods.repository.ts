import { RepositoryInterface } from '@/common/domain/repositories/repository.interface'
import { Supplier } from '@/suppliers/infrastructure/typeorm/entities/suppliers.entities'
import { FoodModel } from '../domain/models/foods.model'

export type CreateFoodsProps = {
  name: string
  quantity: number
  price: number
  supplier_id: Supplier
}

export interface FoodsRepository
  extends RepositoryInterface<FoodModel, CreateFoodsProps> {}
