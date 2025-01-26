import { ConflictError } from '@/common/domain/errors/conflict-error'
import { NotFoundError } from '@/common/domain/errors/not-found-error'
import { SupplierModel } from '@/suppliers/domain/models/suppliers.model'

import {
  CreateSupplierProps,
  SuppliersRepository,
} from '@/suppliers/repositories/Suppliers.repository'
import { inject, injectable } from 'tsyringe'
import { Repository } from 'typeorm'

@injectable()
export class SuppliersTypeormRepository implements SuppliersRepository {
  constructor(
    @inject('SuppliersDefaultTypeormRepository')
    private suppliersRepository: Repository<SupplierModel>,
  ) {}

  async conflictingEmail(email: string): Promise<void> {
    const supplier = await this.suppliersRepository.findOneBy({ email })

    console.log(supplier)

    if (supplier) {
      throw new ConflictError(
        `There is already a supplier using this email: ${email}`,
      )
    }
  }

  create(props: CreateSupplierProps): SupplierModel {
    return this.suppliersRepository.create(props)
  }

  async insert(model: SupplierModel): Promise<SupplierModel> {
    return this.suppliersRepository.save(model)
  }

  async findById(id: string): Promise<SupplierModel> {
    return this._get(id)
  }

  async update(model: SupplierModel): Promise<SupplierModel> {
    await this._get(model.id)

    await this.suppliersRepository.update({ id: model.id }, model)

    return model
  }

  async delete(id: string): Promise<void> {
    await this._get(id)
    await this.suppliersRepository.delete({ id })
  }

  protected async _get(id: string): Promise<SupplierModel> {
    const supplier = this.suppliersRepository.findOneBy({ id })

    if (!supplier) {
      throw new NotFoundError(`Supplier not found using ID ${id}`)
    }

    return supplier
  }
}
