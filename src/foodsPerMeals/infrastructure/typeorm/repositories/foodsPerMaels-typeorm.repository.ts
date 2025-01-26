import { NotFoundError } from '@/common/domain/errors/not-found-error'
import { FoodsPerMealsModel } from '@/foodsPerMeals/domain/models/foods-per-meals.model'
import {
  CreateFoodsPerMealsProps,
  FoodsPerMealsRepository,
} from '@/foodsPerMeals/repositories/foodsPerMealsRepository'
import { inject, injectable } from 'tsyringe'
import { Repository } from 'typeorm'

@injectable()
export class FoodsPerMealsTypeormRepository implements FoodsPerMealsRepository {
  constructor(
    @inject('FoodsPerMealsDefaultTypeormRepository')
    private foodsPerMealsRepository: Repository<FoodsPerMealsModel>,
  ) {}

  create(props: CreateFoodsPerMealsProps): FoodsPerMealsModel {
    return this.foodsPerMealsRepository.create(props)
  }

  async insert(model: FoodsPerMealsModel): Promise<FoodsPerMealsModel> {
    return this.foodsPerMealsRepository.save(model)
  }

  async findById(id: string): Promise<FoodsPerMealsModel> {
    return this._get(id)
  }

  async update(model: FoodsPerMealsModel): Promise<FoodsPerMealsModel> {
    await this._get(model.id)

    await this.foodsPerMealsRepository.update({ id: model.id }, model)

    return model
  }

  async delete(id: string): Promise<void> {
    await this._get(id)
    await this.foodsPerMealsRepository.delete({ id })
  }

  protected async _get(id: string): Promise<FoodsPerMealsModel> {
    const foodsPerMeal = await this.foodsPerMealsRepository.findOne({
      where: { id },
      relations: ['food_id', 'meal_id'],
    })

    if (!foodsPerMeal) {
      throw new NotFoundError(`FoodsPerMeal not found using ID ${id}`)
    }

    return foodsPerMeal
  }
}
