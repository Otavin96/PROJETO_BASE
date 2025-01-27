import { inject, injectable } from 'tsyringe'
import { SupplierOutput } from '../dtos/suppliers.output.dto'
import { SuppliersRepository } from '@/suppliers/repositories/Suppliers.repository'
import { BadRequestError } from '@/common/domain/errors/bad-request-error'

export namespace GetSuppliersUseCase {
  export type Input = {
    id: string
  }

  export type Output = SupplierOutput

  @injectable()
  export class UseCase {
    constructor(
      @inject('SuppliersRepository')
      private suppliersRepository: SuppliersRepository,
    ) {}

    async execute(input: Input): Promise<Output> {
      if (!input.id) {
        throw new BadRequestError('Input data not provided or invalid')
      }

      const meal = await this.suppliersRepository.findById(input.id)

      return meal
    }
  }
}
