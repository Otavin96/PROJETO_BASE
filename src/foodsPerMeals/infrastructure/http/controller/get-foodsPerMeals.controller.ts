import { dataValidation } from '@/common/infrastructure/validation/zod'
import { GetFoodsPerMealsUseCase } from '@/foodsPerMeals/application/usecases/get-foodsPerMeal.usecase'
import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { z } from 'zod'

export async function GetFoodsPerMealsController(
  request: Request,
  response: Response,
) {
  const getFoodsPerMealsSchemaParam = z.object({
    id: z.string(),
  })

  const { id } = dataValidation(getFoodsPerMealsSchemaParam, request.params)

  const getFoodsPerMealsUseCase: GetFoodsPerMealsUseCase.UseCase =
    container.resolve('GetFoodsPerMealsUseCase')

  const foodsPerMeals = await getFoodsPerMealsUseCase.execute({
    id,
  })

  response
    .status(201)
    .json([
      { message: 'Alimento por refeição encontrado com sucesso!' },
      foodsPerMeals,
    ])
}
