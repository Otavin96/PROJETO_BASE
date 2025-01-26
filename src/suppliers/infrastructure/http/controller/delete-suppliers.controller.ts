import { dataValidation } from '@/common/infrastructure/validation/zod'
import { DeleteSuppliersUseCase } from '@/suppliers/application/usecases/delete-suppliers.usecase'
import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { z } from 'zod'

export async function DeleteSuppliersController(
  request: Request,
  response: Response,
) {
  const deleteSuppliersSchemaParams = z.object({
    id: z.string().uuid(),
  })

  const { id } = dataValidation(deleteSuppliersSchemaParams, request.params)

  const deleteSuppliersUseCase: DeleteSuppliersUseCase.UseCase =
    container.resolve('DeleteSuppliersUseCase')

  await deleteSuppliersUseCase.execute({ id })

  response.status(200).json([{ message: 'Fornecedor deletado com sucesso!' }])
}
