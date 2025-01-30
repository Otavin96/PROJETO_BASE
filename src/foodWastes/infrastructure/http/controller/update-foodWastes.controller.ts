import { dataValidation } from '@/common/infrastructure/validation/zod'
import { UpdateFoodWasteUseCase } from '@/foodWastes/application/usecases/update-foodWaste.usecase'
import { Update } from '@reduxjs/toolkit'
import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { z } from 'zod'

export async function UpdateFoodWastesController(req: Request, res: Response) {
  const updateFoodWastesSchemaParams = z.object({
    id: z.string().uuid(),
  })

  const { id } = dataValidation(updateFoodWastesSchemaParams, req.params)

  const updateFoodWastesSchemaBody = z.object({
    meal_id: z.string().uuid().optional(),
    food_per_meal_id: z.string().uuid().optional(),
    waste_quantity: z.number().optional(),
  })

  const { meal_id, food_per_meal_id, waste_quantity } = dataValidation(
    updateFoodWastesSchemaBody,
    req.body,
  )

  const updateFoodWastesUseCase: UpdateFoodWasteUseCase.UseCase =
    container.resolve('UpdateFoodWastesUseCase')

  const foodWaste = await updateFoodWastesUseCase.execute({
    id,
    meal_id,
    food_per_meal_id,
    waste_quantity,
  })

  res
    .status(200)
    .json([
      { message: 'Alimento desperciçado atualizado com sucesso!' },
      foodWaste,
    ])
}
