import { FoodsPerMeal } from '@/foodsPerMeals/infrastructure/typeorm/entities/foods-per-meals.entities'
import { Meal } from '@/meals/infrastructure/typeorm/entities/meals.entities'
import { FoodWasteOutput } from '../dtos/foodWaste-output.dto'
import { inject, injectable } from 'tsyringe'
import { FoodWastesRepository } from '@/foodWastes/repositories/foodWates.repositories'
import { BadRequestError } from '@/common/domain/errors/bad-request-error'

export namespace CreateFoodWastesUseCase {
  export type Input = {
    meal_id: Meal
    food_per_meal_id: FoodsPerMeal
    waste_quantity: number
  }

  export type Output = FoodWasteOutput

  @injectable()
  export class UseCase {
    constructor(
      @inject('FoodWastesRepository')
      private foodWastesRepository: FoodWastesRepository,
    ) {}

    async execute(input: Input): Promise<Output> {
      if (
        !input.meal_id ||
        !input.food_per_meal_id ||
        input.waste_quantity < 0
      ) {
        throw new BadRequestError('Input data not provided or invalid')
      }

      const foodWaste = this.foodWastesRepository.create(input)

      const createdFoodWaste: FoodWasteOutput =
        await this.foodWastesRepository.insert(foodWaste)

      return createdFoodWaste
    }
  }
}
