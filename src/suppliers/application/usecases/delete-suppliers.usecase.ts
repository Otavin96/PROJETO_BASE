import { SuppliersRepository } from '@/suppliers/repositories/Suppliers.repository'
import { SupplierOutput } from '../dtos/suppliers.output.dto'
import { inject, injectable } from 'tsyringe'

export namespace DeleteSuppliersUseCase {
  export type Input = {
    id: string
  }

  export type Output = void

  @injectable()
  export class UseCase {
    constructor(
      @inject('SuppliersRepository')
      private suppliersRepository: SuppliersRepository,
    ) {}

    async execute(input: Input): Promise<Output> {
      await this.suppliersRepository.delete(input.id)
    }
  }
}
