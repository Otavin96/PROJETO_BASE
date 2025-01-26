import { dataValidation } from '@/common/infrastructure/validation/zod'
import { DeleteMealsUseCase } from '@/meals/application/usecases/delete-meals.usecase'
import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { z } from 'zod'

export async function DeleteMealsController(
  request: Request,
  response: Response,
) {
  const deleteMealsSchemaParams = z.object({
    id: z.string(),
  })

  const { id } = dataValidation(deleteMealsSchemaParams, request.params)

  const deleteMealsUseCase: DeleteMealsUseCase.UseCase =
    container.resolve('DeleteMealsUseCase')

  await deleteMealsUseCase.execute({ id })

  response.status(200).json([{ message: 'Refeição deletada com sucesso!' }])
}
