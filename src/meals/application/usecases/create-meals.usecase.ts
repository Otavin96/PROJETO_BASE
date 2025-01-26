import { DayOfWeek } from '@/meals/domain/models/meals.model'
import { MealsOutput } from '../dtos/meals.output.dto'
import { injectable, inject } from 'tsyringe'
import { MealsRepository } from '@/meals/repositories/meals.repository'
import { BadRequestError } from '@/common/domain/errors/bad-request-error'
import { FoodsPerMeal } from '@/foodsPerMeals/infrastructure/typeorm/entities/foods-per-meals.entities'

export namespace CreateMealsUseCase {
  export type Input = {
    day_of_week: DayOfWeek
    date: Date
  }

  export type Output = MealsOutput

  @injectable()
  export class UseCase {
    constructor(
      @inject('MealsRepository')
      private mealsRepository: MealsRepository,
    ) {}

    async execute(input: Input): Promise<Output> {
      if (input.day_of_week <= 0 || !input.date) {
        throw new BadRequestError('Input data not provided or invalid')
      }

      this.mealsRepository.conflictingDate(input.date)

      const meal = this.mealsRepository.create(input)

      const createdMeal = await this.mealsRepository.insert(meal)

      return createdMeal
    }
  }
}
