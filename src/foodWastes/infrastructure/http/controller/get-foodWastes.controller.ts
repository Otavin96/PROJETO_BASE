import { dataValidation } from '@/common/infrastructure/validation/zod'
import { GetFoodWastesUseCase } from '@/foodWastes/application/usecases/get-foodWaste.usecase'
import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { z } from 'zod'

export async function GetFoodWastesController(req: Request, res: Response) {
  const getFoodWasteSchemaParams = z.object({
    id: z.string().uuid(),
  })

  const { id } = dataValidation(getFoodWasteSchemaParams, req.params)

  const getFoodWastesUseCase: GetFoodWastesUseCase.UseCase = container.resolve(
    'GetFoodWastesUseCase',
  )

  const foodWaste = await getFoodWastesUseCase.execute({ id })

  res
    .status(200)
    .json([
      { message: 'Alimento Desperdiçãdo encontrado com sucesso!' },
      foodWaste,
    ])
}
