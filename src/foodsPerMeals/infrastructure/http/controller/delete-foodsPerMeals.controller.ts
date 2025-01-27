import { dataValidation } from '@/common/infrastructure/validation/zod'
import { DeleteFoodsPerMealsUseCase } from '@/foodsPerMeals/application/usecases/delete-foodsPerMeal.usecase'
import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { z } from 'zod'

export async function DeleteFoodsPerMealsController(
  request: Request,
  response: Response,
) {
  const deleteFoodsPerMealsSchemaParam = z.object({
    id: z.string().uuid(),
  })

  const { id } = dataValidation(deleteFoodsPerMealsSchemaParam, request.params)

  const deleteFoodsPerMealsUseCase: DeleteFoodsPerMealsUseCase.UseCase =
    container.resolve('DeleteFoodsPerMealsUseCase')

  await deleteFoodsPerMealsUseCase.execute({
    id,
  })

  response
    .status(200)
    .json([{ message: 'Alimento por refeição deletado com sucesso!' }])
}
