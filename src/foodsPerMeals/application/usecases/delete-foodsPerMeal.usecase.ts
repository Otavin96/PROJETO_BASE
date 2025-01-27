import { inject, injectable } from 'tsyringe'
import { FoodsPerMealsRepository } from '@/foodsPerMeals/repositories/foodsPerMealsRepository'

export namespace DeleteFoodsPerMealsUseCase {
  export type Input = {
    id: string
  }

  export type Output = void

  @injectable()
  export class UseCase {
    constructor(
      @inject('FoodsPerMealsRepository')
      private foodsPerMealsRepository: FoodsPerMealsRepository,
    ) {}

    async execute(input: Input): Promise<Output> {
      await this.foodsPerMealsRepository.delete(input.id)
    }
  }
}
