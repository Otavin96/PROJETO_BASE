import { MealsModel } from '@/meals/domain/models/meals.model'
import {
  CreateMealsProps,
  MealsRepository,
} from '@/meals/repositories/meals.repository'
import { inject, injectable } from 'tsyringe'
import { Repository } from 'typeorm'
import { Meal } from '../entities/meals.entities'
import { NotFoundError } from '@/common/domain/errors/not-found-error'
import { ConflictError } from '@/common/domain/errors/conflict-error'

@injectable()
export class MealsTypeormRepository implements MealsRepository {
  constructor(
    @inject('MealsDefaultTypeormRepository')
    private mealsRepository: Repository<Meal>,
  ) {}

  async conflictingDate(date: Date): Promise<void> {
    const existedDate = await this.mealsRepository.findOneBy({ date })
    console.log(existedDate)
    if (existedDate) {
      throw new ConflictError('this date is already being used')
    }
  }

  create(props: CreateMealsProps): MealsModel {
    return this.mealsRepository.create(props)
  }

  async insert(model: MealsModel): Promise<MealsModel> {
    return this.mealsRepository.save(model)
  }

  async findById(id: string): Promise<MealsModel> {
    return this._get(id)
  }

  async update(model: MealsModel): Promise<MealsModel> {
    await this._get(model.id)

    await this.mealsRepository.update({ id: model.id }, model)

    return model
  }

  async delete(id: string): Promise<void> {
    await this._get(id)

    await this.mealsRepository.delete(id)
  }

  protected async _get(id: string): Promise<MealsModel> {
    const meal = await this.mealsRepository.findOneBy({ id })

    if (!meal) {
      throw new NotFoundError(`Meal not found using ID: ${id}`)
    }

    return meal
  }
}
