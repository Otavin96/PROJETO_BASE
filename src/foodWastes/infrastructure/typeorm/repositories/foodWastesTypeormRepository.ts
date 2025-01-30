import {
  CreateFoodWasteProps,
  FoodWastesRepository,
} from '@/foodWastes/repositories/foodWates.repositories'
import { inject, injectable } from 'tsyringe'
import { Repository } from 'typeorm'
import { FoodWaste } from '../entities/foodWastes.entities'
import { FoodWasteModel } from '@/foodWastes/domain/models/foodWaste.model'
import { NotFoundError } from '@/common/domain/errors/not-found-error'

@injectable()
export class FoodWastesTypeormRepository implements FoodWastesRepository {
  constructor(
    @inject('FoodWastesDefaultTypeormRepository')
    private foodsWastesRepository: Repository<FoodWaste>,
  ) {}

  create(props: CreateFoodWasteProps): FoodWasteModel {
    return this.foodsWastesRepository.create(props)
  }

  async insert(model: FoodWasteModel): Promise<FoodWasteModel> {
    return this.foodsWastesRepository.save(model)
  }

  async findById(id: string): Promise<FoodWasteModel> {
    return this._get(id)
  }

  async update(model: FoodWasteModel): Promise<FoodWasteModel> {
    await this._get(model.id)

    await this.foodsWastesRepository.update({ id: model.id }, model)

    return model
  }

  async delete(id: string): Promise<void> {
    await this._get(id)
    await this.foodsWastesRepository.delete(id)
  }

  protected async _get(id: string): Promise<FoodWasteModel> {
    const foodWaste = await this.foodsWastesRepository.findOne({
      where: { id },
      relations: ['meal_id', 'food_per_meal_id'],
    })

    if (!foodWaste) {
      throw new NotFoundError(`Not found foodWaste using ID: ${id}`)
    }

    return foodWaste
  }
}
