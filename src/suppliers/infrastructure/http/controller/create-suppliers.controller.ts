import { dataValidation } from '@/common/infrastructure/validation/zod'
import { CreateSuppliersUseCase } from '@/suppliers/application/usecases/create-suppliers.usecase'
import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { z } from 'zod'

export async function CreateSuppliersController(
  request: Request,
  response: Response,
) {
  const createSupplierSchemaBody = z.object({
    name: z.string(),
    description: z.string(),
    email: z.string().email(),
    phone: z.string(),
  })

  const { name, description, email, phone } = dataValidation(
    createSupplierSchemaBody,
    request.body,
  )

  const createSuppliersUseCase: CreateSuppliersUseCase.UseCase =
    container.resolve('CreateSuppliersUseCase')

  const supplier = await createSuppliersUseCase.execute({
    name,
    description,
    email,
    phone,
  })

  response
    .status(201)
    .json([{ message: 'Fornecedor cadastrado com sucesso!' }, supplier])
}
