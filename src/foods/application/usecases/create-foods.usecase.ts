import { Supplier } from '@/suppliers/infrastructure/typeorm/entities/suppliers.entities'
import { FoodOutput } from '../dtos/food-output.dto'
import { inject, injectable } from 'tsyringe'
import { FoodsRepository } from '@/foods/repositories/foods.repository'
import { SuppliersRepository } from '@/suppliers/repositories/Suppliers.repository'
import { BadRequestError } from '@/common/domain/errors/bad-request-error'

export namespace CreateFoodsUseCase {
  export type Input = {
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
      //   @inject('SuppliersRepository')
      //   private suppliersRepository: SuppliersRepository,
    ) {}

    async execute(input: Input): Promise<Output> {
      if (
        !input.name ||
        input.quantity < 0 ||
        input.price < 0 ||
        !input.supplier_id
      ) {
        throw new BadRequestError('Input data not provided or invalid')
      }

      const food = this.foodsRepository.create(input)

      const CreatedFood: FoodOutput = await this.foodsRepository.insert(food)

      return CreatedFood
    }
  }
}
