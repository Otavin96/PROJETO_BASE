import { Supplier } from '@/suppliers/infrastructure/typeorm/entities/suppliers.entities'
import { inject, injectable } from 'tsyringe'
import { FoodOutput } from '../dtos/food-output.dto'
import { FoodsRepository } from '@/foods/repositories/foods.repository'

export namespace UpdateFoodsUseCase {
  export type Input = {
    id: string
    name: string
    quantity: number
    price: number
    supplier_id: Supplier
  }

  export type Output = FoodOutput

  @injectable()
  export class UseCase {
    constructor(
      @inject('FoodsRepository')
      private foodsRepository: FoodsRepository,
    ) {}

    async execute(input: Input): Promise<Output> {
      const food = await this.foodsRepository.findById(input.id)

      if (input.name) {
        food.name = input.name
      }

      if (input.quantity) {
        food.quantity = input.quantity
      }
      if (input.price) {
        food.price = input.price
      }
      if (input.supplier_id) {
        food.supplier_id = input.supplier_id
      }

      const updatedFood = await this.foodsRepository.update(food)

      return updatedFood
    }
  }
}
