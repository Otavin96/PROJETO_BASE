import { Food } from '@/foods/infrastructure/typeorm/entities/foods.entity'
import { Meal } from '@/meals/infrastructure/typeorm/entities/meals.entities'
import { FoodsPerMealsOutput } from '../dtos/foodsPerMeals-output.dto'
import { injectable, inject } from 'tsyringe'
import { FoodsPerMealsRepository } from '@/foodsPerMeals/repositories/foodsPerMealsRepository'

export namespace UpdateFoodsPerMealsUseCase {
  export type Input = {
    id: string
    food_id: Food
    meal_id: Meal
    quantity: number
  }

  export type Output = FoodsPerMealsOutput

  @injectable()
  export class UseCase {
    constructor(
      @inject('FoodsPerMealsRepository')
      private foodsPerMealsRepository: FoodsPerMealsRepository,
    ) {}

    async execute(input: Input): Promise<Output> {
      const foodsPerMeal = await this.foodsPerMealsRepository.findById(input.id)

      if (input.food_id) {
        foodsPerMeal.food_id = input.food_id
      }

      if (input.meal_id) {
        foodsPerMeal.meal_id = input.meal_id
      }

      if (input.quantity) {
        foodsPerMeal.quantity = input.quantity
      }

      const updatedFoodsPerMeals =
        await this.foodsPerMealsRepository.update(foodsPerMeal)

      return updatedFoodsPerMeals
    }
  }
}
