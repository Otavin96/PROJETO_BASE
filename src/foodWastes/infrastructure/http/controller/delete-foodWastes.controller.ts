import { dataValidation } from '@/common/infrastructure/validation/zod'
import { DeleteFoodWastesUseCase } from '@/foodWastes/application/usecases/delete-foodWaste.usecase'
import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { z } from 'zod'

export async function DeleteFoodWastesController(req: Request, res: Response) {
  const deleteFoodWasteSchemaParams = z.object({
    id: z.string().uuid(),
  })

  const { id } = dataValidation(deleteFoodWasteSchemaParams, req.params)

  const deleteFoodWastesUseCase: DeleteFoodWastesUseCase.UseCase =
    container.resolve('DeleteFoodWastesUseCase')

  await deleteFoodWastesUseCase.execute({ id })

  res
    .status(200)
    .json([{ message: 'Alimento Desperdiçãdo deletado com sucesso!' }])
}
