import { dataValidation } from '@/common/infrastructure/validation/zod'
import { UpdateFoodsPerMealsUseCase } from '@/foodsPerMeals/application/usecases/update-foodsPerMael.usecase'
import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { z } from 'zod'

export async function UpdateFoodsPerMealsController(
  request: Request,
  response: Response,
) {
  const UpdateFoodsPerMealsSchemaParam = z.object({
    id: z.string().uuid(),
  })

  const UpdateFoodsPerMealsSchemaBody = z.object({
    food_id: z.string().optional(),
    meal_id: z.string().optional(),
    quantity: z.number().optional(),
  })

  const { id } = dataValidation(UpdateFoodsPerMealsSchemaParam, request.params)

  const { food_id, meal_id, quantity } = dataValidation(
    UpdateFoodsPerMealsSchemaBody,
    request.body,
  )

  const UpdateFoodsPerMealsUseCase: UpdateFoodsPerMealsUseCase.UseCase =
    container.resolve('UpdateFoodsPerMealsUseCase')

  const foodsPerMeals = await UpdateFoodsPerMealsUseCase.execute({
    id,
    food_id,
    meal_id,
    quantity,
  })

  response
    .status(201)
    .json([
      { message: 'Alimento por refeição atualizado com sucesso!' },
      foodsPerMeals,
    ])
}
