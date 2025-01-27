import { dataValidation } from '@/common/infrastructure/validation/zod'
import { container } from 'tsyringe'
import { Request, Response } from 'express'
import { z } from 'zod'
import { GetFoodsUseCase } from '@/foods/application/usecases/get-foods.usecase'

export async function GetFoodsController(request: Request, response: Response) {
  const getFoodsSchemaParams = z.object({
    id: z.string(),
  })

  const { id } = dataValidation(getFoodsSchemaParams, request.params)

  const getFoodsUseCase: GetFoodsUseCase.UseCase =
    container.resolve('GetFoodsUseCase')

  const food = await getFoodsUseCase.execute({ id })

  response
    .status(200)
    .json([{ message: 'Alimento encontrado com sucesso!' }, food])
}
