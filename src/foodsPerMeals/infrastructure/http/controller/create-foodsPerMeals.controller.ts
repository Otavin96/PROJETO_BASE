import { dataValidation } from '@/common/infrastructure/validation/zod'
import { CreateFoodsPerMealsUseCase } from '@/foodsPerMeals/application/usecases/create-foodsPerMael.usecase'
import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { z } from 'zod'

export async function CreateFoodsPerMealsController(
  request: Request,
  response: Response,
) {
  const createFoodsPerMealsSchemaBody = z.object({
    food_id: z.string(),
    meal_id: z.string(),
    quantity: z.number(),
  })

  const { food_id, meal_id, quantity } = dataValidation(
    createFoodsPerMealsSchemaBody,
    request.body,
  )

  const createFoodsPerMealsUseCase: CreateFoodsPerMealsUseCase.UseCase =
    container.resolve('CreateFoodsPerMealsUseCase')

  const foodsPerMeals = await createFoodsPerMealsUseCase.execute({
    food_id,
    meal_id,
    quantity,
  })

  response
    .status(201)
    .json([
      { message: 'Alimento por refeição cadastrado com sucesso!' },
      foodsPerMeals,
    ])
}
