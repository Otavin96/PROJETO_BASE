import { dataValidation } from '@/common/infrastructure/validation/zod'
import { container } from 'tsyringe'
import { Request, Response } from 'express'
import { z } from 'zod'
import { DeleteFoodsUseCase } from '@/foods/application/usecases/delete-foods.usecase'

export async function DeleteFoodsController(
  request: Request,
  response: Response,
) {
  const DeleteFoodsSchemaParams = z.object({
    id: z.string(),
  })

  const { id } = dataValidation(DeleteFoodsSchemaParams, request.params)

  const deleteFoodsUseCase: DeleteFoodsUseCase.UseCase =
    container.resolve('DeleteFoodsUseCase')

  await deleteFoodsUseCase.execute({ id })

  response.status(200).json([{ message: 'Alimento deletado com sucesso!' }])
}
