import { Food } from '@/foods/infrastructure/typeorm/entities/foods.entity'
import { FoodsPerMeal } from '@/foodsPerMeals/infrastructure/typeorm/entities/foods-per-meals.entities'
import { Meal } from '@/meals/infrastructure/typeorm/entities/meals.entities'
import { FoodWasteOutput } from '../dtos/foodWaste-output.dto'
import { inject, injectable } from 'tsyringe'
import { FoodWastesRepository } from '@/foodWastes/repositories/foodWates.repositories'

export namespace UpdateFoodWastesUseCase {
  export type Input = {
    id: string
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
      console.log('input', input)

      const foodWaste = await this.foodWastesRepository.findById(input.id)

      if (input.meal_id) {
        foodWaste.meal_id = input.meal_id
      }

      if (input.food_per_meal_id) {
        foodWaste.food_per_meal_id = input.food_per_meal_id
      }

      if (input.waste_quantity) {
        foodWaste.waste_quantity = input.waste_quantity
      }

      const updatedFoodWaste = await this.foodWastesRepository.update(foodWaste)

      return updatedFoodWaste
    }
  }
}
