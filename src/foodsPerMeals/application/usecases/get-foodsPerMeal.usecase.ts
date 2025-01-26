import { inject, injectable } from 'tsyringe'
import { FoodsPerMealsOutput } from '../dtos/foodsPerMeals-output.dto'
import { FoodsPerMealsRepository } from '@/foodsPerMeals/repositories/foodsPerMealsRepository'
import { BadRequestError } from '@/common/domain/errors/bad-request-error'

export namespace GetFoodsPerMealsUseCase {
  export type Input = {
    id: string
  }

  export type Output = FoodsPerMealsOutput

  @injectable()
  export class UseCase {
    constructor(
      @inject('FoodsPerMealsRepository')
      private foodsPerMealsRepository: FoodsPerMealsRepository,
    ) {}

    async execute(input: Input): Promise<Output> {
      if (!input.id) {
        throw new BadRequestError('Input data not provided or invalid')
      }

      const foodsPerMeals = await this.foodsPerMealsRepository.findById(
        input.id,
      )

      return foodsPerMeals
    }
  }
}
