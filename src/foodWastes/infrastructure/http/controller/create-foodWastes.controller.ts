import { dataValidation } from '@/common/infrastructure/validation/zod'
import { CreateFoodWastesUseCase } from '@/foodWastes/application/usecases/create-foodwaste.usecase'
import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { z } from 'zod'

export async function CreateFoodWastesController(req: Request, res: Response) {
  const createFoodWasteSchemaBody = z.object({
    meal_id: z.string().uuid(),
    food_per_meal_id: z.string().uuid(),
    waste_quantity: z.number(),
  })

  const { meal_id, food_per_meal_id, waste_quantity } = dataValidation(
    createFoodWasteSchemaBody,
    req.body,
  )

  const createFoodWastesUseCase: CreateFoodWastesUseCase.UseCase =
    container.resolve('CreateFoodWastesUseCase')

  const foodWaste = await createFoodWastesUseCase.execute({
    meal_id,
    food_per_meal_id,
    waste_quantity,
  })

  res
    .status(201)
    .json([
      { message: 'Desperdício de alimento cadastrado com sucesso!!!' },
      foodWaste,
    ])
}
