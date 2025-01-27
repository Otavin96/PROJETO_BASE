import { inject, injectable } from 'tsyringe'
import { BadRequestError } from '@/common/domain/errors/bad-request-error'
import { FoodOutput } from '../dtos/food-output.dto'
import { FoodsRepository } from '@/foods/repositories/foods.repository'

export namespace GetFoodsUseCase {
  export type Input = {
    id: string
  }

  export type Output = FoodOutput

  @injectable()
  export class UseCase {
    constructor(
      @inject('FoodsRepository')
      private foodsRepository: FoodsRepository,
    ) {}

    async execute(input: Input): Promise<Output> {
      if (!input.id) {
        throw new BadRequestError('Input data not provided or invalid')
      }

      const food = await this.foodsRepository.findById(input.id)

      return food
    }
  }
}
