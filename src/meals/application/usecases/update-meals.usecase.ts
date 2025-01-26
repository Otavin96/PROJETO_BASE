import { DayOfWeek } from '@/meals/domain/models/meals.model'
import { MealsOutput } from '../dtos/meals.output.dto'
import { inject, injectable } from 'tsyringe'
import { MealsRepository } from '@/meals/repositories/meals.repository'
export namespace UpdateMealsUseCase {
  export type Input = {
    id: string
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
      const meal = await this.mealsRepository.findById(input.id)

      if (input.day_of_week) {
        meal.day_of_week = input.day_of_week
      }

      if (input.date) {
        meal.date = input.date
      }

      const updatedMeal = await this.mealsRepository.update(meal)

      return updatedMeal
    }
  }
}
