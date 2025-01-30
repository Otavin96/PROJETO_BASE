import { FoodWastesRepository } from '@/foodWastes/repositories/foodWates.repositories'
import { inject, injectable } from 'tsyringe'

export namespace DeleteFoodWastesUseCase {
  export type Input = {
    id: string
  }

  export type Output = void

  @injectable()
  export class UseCase {
    constructor(
      @inject('FoodWastesRepository')
      private foodWastesRepository: FoodWastesRepository,
    ) {}

    async execute(input: Input): Promise<Output> {
      await this.foodWastesRepository.delete(input.id)
    }
  }
}
