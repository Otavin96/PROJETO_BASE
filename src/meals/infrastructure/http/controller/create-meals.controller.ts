import { dataValidation } from '@/common/infrastructure/validation/zod'
import { CreateMealsUseCase } from '@/meals/application/usecases/create-meals.usecase'
import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { z } from 'zod'

export async function CreateMealsController(
  request: Request,
  response: Response,
) {
  const createMealsSchemaBody = z.object({
    day_of_week: z.enum(['1', '2', '3', '4', '5', '6', '7']),
    date: z.string(),
  })

  const { day_of_week, date } = dataValidation(
    createMealsSchemaBody,
    request.body,
  )

  const createMealsUseCase: CreateMealsUseCase.UseCase =
    container.resolve('CreateMealsUseCase')

  const meal = await createMealsUseCase.execute({
    day_of_week,
    date,
  })

  console.log(meal)

  response
    .status(201)
    .json([{ message: 'Refeição cadastrada com sucesso!' }, meal])
}
