import { inject, injectable } from 'tsyringe'
import { FoodsRepository } from '@/foods/repositories/foods.repository'

export namespace DeleteFoodsUseCase {
  export type Input = {
    id: string
  }

  export type Output = void

  @injectable()
  export class UseCase {
    constructor(
      @inject('FoodsRepository')
      private foodsRepository: FoodsRepository,
    ) {}

    async execute(input: Input): Promise<Output> {
      return this.foodsRepository.delete(input.id)
    }
  }
}
