import { Repository } from 'typeorm'
import { Food } from '../entities/foods.entity'
import {
  CreateFoodsProps,
  FoodsRepository,
} from '@/foods/repositories/foods.repository'
import { FoodModel } from '@/foods/domain/models/foods.model'
import { inject, injectable } from 'tsyringe'
import { NotFoundError } from '@/common/domain/errors/not-found-error'

@injectable()
export class FoodsTypeormRepository implements FoodsRepository {
  constructor(
    @inject('FoodsDefaultTypeormRepository')
    private foodsRepository: Repository<Food>,
  ) {}

  create(props: CreateFoodsProps): FoodModel {
    return this.foodsRepository.create(props)
  }

  async insert(model: FoodModel): Promise<FoodModel> {
    const food = await this.foodsRepository.save(model)

    return food
  }

  async findById(id: string): Promise<FoodModel> {
    return this._get(id)
  }

  async update(model: FoodModel): Promise<FoodModel> {
    await this._get(model.id)

    await this.foodsRepository.update({ id: model.id }, model)

    return model
  }

  async delete(id: string): Promise<void> {
    await this._get(id)

    await this.foodsRepository.delete(id)
  }

  protected async _get(id: string): Promise<FoodModel> {
    const food = await this.foodsRepository.findOneBy({ id })

    if (!food) {
      throw new NotFoundError(`Food not found using ID: ${id}`)
    }

    return food
  }
}
