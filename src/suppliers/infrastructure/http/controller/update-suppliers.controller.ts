import { dataValidation } from '@/common/infrastructure/validation/zod'
import { UpdateSuppliersUseCase } from '@/suppliers/application/usecases/update-suppliers.usecase'
import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { z } from 'zod'

export async function UpdateSuppliersController(
  request: Request,
  response: Response,
) {
  const updateSupplierSchemaParams = z.object({
    id: z.string().uuid(),
  })

  const updateSupplierSchemaBody = z.object({
    name: z.string().optional(),
    description: z.string().optional(),
    email: z.string().email().optional(),
    phone: z.string().optional(),
  })

  const { id } = dataValidation(updateSupplierSchemaParams, request.params)
  const { name, description, email, phone } = dataValidation(
    updateSupplierSchemaBody,
    request.body,
  )

  const UpdateSuppliersUseCase: UpdateSuppliersUseCase.UseCase =
    container.resolve('UpdateSuppliersUseCase')

  const supplier = await UpdateSuppliersUseCase.execute({
    id,
    name,
    description,
    email,
    phone,
  })

  response
    .status(201)
    .json([{ message: 'Fornecedor atualizado com sucesso!' }, supplier])
}
