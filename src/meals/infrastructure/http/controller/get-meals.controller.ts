import { dataValidation } from '@/common/infrastructure/validation/zod'
import { GetMealsUseCase } from '@/meals/application/usecases/get-meals.usecase'
import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { z } from 'zod'

export async function GetMealsController(request: Request, response: Response) {
  const getMealsSchemaParams = z.object({
    id: z.string(),
  })

  const { id } = dataValidation(getMealsSchemaParams, request.params)

  const getMealsUseCase: GetMealsUseCase.UseCase =
    container.resolve('GetMealsUseCase')

  const meal = await getMealsUseCase.execute({ id })

  response
    .status(201)
    .json([{ message: 'Refeição encontrada com sucesso!' }, meal])
}
