import { injectable, inject } from 'tsyringe'
import { FoodWasteOutput } from '../dtos/foodWaste-output.dto'
import { FoodWastesRepository } from '@/foodWastes/repositories/foodWates.repositories'

export namespace GetFoodWastesUseCase {
  export type Input = {
    id: string
  }

  export type Output = FoodWasteOutput

  @injectable()
  export class UseCase {
    constructor(
      @inject('FoodWastesRepository')
      private foodWasteRepository: FoodWastesRepository,
    ) {}

    async execute(input: Input): Promise<Output> {
      const foodWaste = await this.foodWasteRepository.findById(input.id)
      return foodWaste
    }
  }
}
