import { inject, injectable } from 'tsyringe'
import { SupplierOutput } from '../dtos/suppliers.output.dto'
import { SuppliersRepository } from '@/suppliers/repositories/Suppliers.repository'

export namespace UpdateSuppliersUseCase {
  export type Input = {
    id: string
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
      const suppliers = await this.suppliersRepository.findById(input.id)

      if (input.name) {
        suppliers.name = input.name
      }

      if (input.description) {
        suppliers.description = input.description
      }

      if (input.email) {
        await this.suppliersRepository.conflictingEmail(input.email)
        suppliers.email = input.email
      }

      if (input.phone) {
        suppliers.phone = input.phone
      }

      const updatedSupplier = await this.suppliersRepository.update(suppliers)

      return updatedSupplier
    }
  }
}
