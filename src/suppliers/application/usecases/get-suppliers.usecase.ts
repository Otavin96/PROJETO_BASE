import { inject, injectable } from 'tsyringe'
import { SupplierOutput } from '../dtos/suppliers.output.dto'
import { SuppliersRepository } from '@/suppliers/repositories/Suppliers.repository'
import { BadRequestError } from '@/common/domain/errors/bad-request-error'
import { PdfMakerCreateProvider } from '@/common/infrastructure/providers/pdf-provider/pdfmaker-create-provider'

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
      // @inject('PdfMakerCreateProvider')
      // private pdfMakerCreateProvider: PdfMakerCreateProvider,
    ) {}

    async execute(input: Input): Promise<Output> {
      if (!input.id) {
        throw new BadRequestError('Input data not provided or invalid')
      }

      const supplier = await this.suppliersRepository.findById(input.id)

      // const columnsTitle = ['ID', 'Nome', 'Descrição', 'Telefone', 'Email']
      // const data = [
      //   [
      //     String(supplier.id),
      //     String(supplier.name),
      //     String(supplier.description),
      //     String(supplier.phone),
      //     String(supplier.email),
      //   ],
      // ]
      // const title = 'Fornecedor'

      // await this.pdfMakerCreateProvider.createPdf(columnsTitle, data, title)

      return supplier
    }
  }
}
