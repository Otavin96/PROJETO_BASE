import { dataValidation } from '@/common/infrastructure/validation/zod'
import { UpdateFoodsUseCase } from '@/foods/application/usecases/update-foods.usecase'
import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { z } from 'zod'

export async function UpdateFoodsController(
  request: Request,
  response: Response,
) {
  const UpdateFoodschemaParam = z.object({
    id: z.string().uuid(),
  })

  const UpdateFoodschemaBody = z.object({
    name: z.string().optional(),
    quantity: z.number().optional(),
    price: z.number().optional(),
    supplier_id: z.string().optional(),
  })

  const { id } = dataValidation(UpdateFoodschemaParam, request.params)

  const { name, quantity, price, supplier_id } = dataValidation(
    UpdateFoodschemaBody,
    request.body,
  )

  const updateFoodsUseCase: UpdateFoodsUseCase.UseCase =
    container.resolve('UpdateFoodsUseCase')

  const food = await updateFoodsUseCase.execute({
    id,
    name,
    quantity,
    price,
    supplier_id,
  })

  response
    .status(200)
    .json([{ message: 'Alimento atualizado com sucesso!' }, food])
}
