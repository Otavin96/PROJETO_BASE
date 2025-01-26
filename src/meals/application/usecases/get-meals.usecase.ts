import { DayOfWeek } from '@/meals/domain/models/meals.model'
import { MealsOutput } from '../dtos/meals.output.dto'
import { injectable, inject } from 'tsyringe'
import { MealsRepository } from '@/meals/repositories/meals.repository'
import { BadRequestError } from '@/common/domain/errors/bad-request-error'

export namespace GetMealsUseCase {
  export type Input = {
    id: string
  }

  export type Output = MealsOutput

  @injectable()
  export class UseCase {
    constructor(
      @inject('MealsRepository')
      private mealsRepository: MealsRepository,
    ) {}

    async execute(input: Input): Promise<Output> {
      if (!input.id) {
        throw new BadRequestError('Input data not provided or invalid')
      }

      const meal = this.mealsRepository.findById(input.id)

      return meal
    }
  }
}
