import { inject, injectable } from 'tsyringe'
import { SupplierOutput } from '../dtos/suppliers.output.dto'
import { SuppliersRepository } from '@/suppliers/repositories/Suppliers.repository'
import { NotFoundError } from '@/common/domain/errors/not-found-error'
import { BadRequestError } from '@/common/domain/errors/bad-request-error'

export namespace CreateSuppliersUseCase {
  export type Input = {
    name: string
    description: string
    email: string
    phone: string
  }

  export type Output = SupplierOutput

  @injectable()
  export class UseCase {
    constructor(
      @inject('SuppliersRepository')
      private suppliersRepository: SuppliersRepository,
    ) {}

    async execute(input: Input): Promise<Output> {
      if (!input.name || !input.description || !input.email || !input.phone) {
        throw new BadRequestError('Input data not provided or invalid')
      }

      await this.suppliersRepository.conflictingEmail(input.email)

      const supplier = this.suppliersRepository.create(input)

      const createdSupplier: SupplierOutput =
        await this.suppliersRepository.insert(supplier)

      return createdSupplier
    }
  }
}
