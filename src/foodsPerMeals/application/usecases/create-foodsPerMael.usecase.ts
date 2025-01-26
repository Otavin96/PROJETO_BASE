import { Food } from '@/foods/infrastructure/typeorm/entities/foods.entity'
import { Meal } from '@/meals/infrastructure/typeorm/entities/meals.entities'
import { FoodsPerMealsOutput } from '../dtos/foodsPerMeals-output.dto'
import { injectable, inject } from 'tsyringe'
import { FoodsPerMealsRepository } from '@/foodsPerMeals/repositories/foodsPerMealsRepository'
import { BadRequestError } from '@/common/domain/errors/bad-request-error'

export namespace CreateFoodsPerMealsUseCase {
  export type Input = {
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
      if (!input.food_id || !input.meal_id || input.quantity <= 0) {
        throw new BadRequestError('Input data not provided or invalid')
      }

      const foodsPerMeals = this.foodsPerMealsRepository.create(input)

      const createdFoodsPerMeals: FoodsPerMealsOutput =
        await this.foodsPerMealsRepository.insert(foodsPerMeals)

      return createdFoodsPerMeals
    }
  }
}
