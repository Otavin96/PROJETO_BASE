import { dataValidation } from '@/common/infrastructure/validation/zod'
import { UpdateMealsUseCase } from '@/meals/application/usecases/update-meals.usecase'
import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { z } from 'zod'

export async function UpdateMealsController(
  request: Request,
  response: Response,
) {
  const updateMealsSchemaParams = z.object({
    id: z.string(),
  })

  const { id } = dataValidation(updateMealsSchemaParams, request.params)

  const updateMealsSchemaBody = z.object({
    day_of_week: z.enum(['1', '2', '3', '4', '5', '6', '7']).optional(),
    date: z.string().optional(),
  })

  const { day_of_week, date } = dataValidation(
    updateMealsSchemaBody,
    request.body,
  )

  const updateMealsUseCase: UpdateMealsUseCase.UseCase =
    container.resolve('UpdateMealsUseCase')

  const meal = await updateMealsUseCase.execute({ id, day_of_week, date })

  response
    .status(200)
    .json([{ message: 'Refeição atualizada com sucesso!' }, meal])
}
