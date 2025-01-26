import { dataValidation } from '@/common/infrastructure/validation/zod'
import { Request, Response } from 'express'
import { CreateFoodsUseCase } from '@/foods/application/usecases/create-foods.usecase'
import { container } from 'tsyringe'
import { z } from 'zod'

export async function CreateFoodsController(
  request: Request,
  response: Response,
) {
  const createFoodschemaBody = z.object({
    name: z.string(),
    quantity: z.number(),
    price: z.number(),
    supplier_id: z.string(),
  })

  const { name, quantity, price, supplier_id } = dataValidation(
    createFoodschemaBody,
    request.body,
  )

  const createFoodsUseCase: CreateFoodsUseCase.UseCase =
    container.resolve('CreateFoodsUseCase')

  const food = await createFoodsUseCase.execute({
    name,
    quantity,
    price,
    supplier_id,
  })

  console.log(food)

  response
    .status(201)
    .json([{ message: 'Alimento cadastrado com sucesso!' }, food])
}
