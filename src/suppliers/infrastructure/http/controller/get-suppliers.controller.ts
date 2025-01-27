import { dataValidation } from '@/common/infrastructure/validation/zod'
import { GetSuppliersUseCase } from '@/suppliers/application/usecases/get-suppliers.usecase'
import { container } from 'tsyringe'
import { Request, Response } from 'express'
import { z } from 'zod'

export async function GetSuppliersController(
  request: Request,
  response: Response,
) {
  const getSuppliersSchemaParams = z.object({
    id: z.string(),
  })

  const { id } = dataValidation(getSuppliersSchemaParams, request.params)

  const getSuppliersUseCase: GetSuppliersUseCase.UseCase = container.resolve(
    'GetSuppliersUseCase',
  )

  const meal = await getSuppliersUseCase.execute({ id })

  response
    .status(200)
    .json([{ message: 'Fornecedor encontrado com sucesso!' }, meal])
}
