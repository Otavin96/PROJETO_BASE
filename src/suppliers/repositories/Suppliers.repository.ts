import { RepositoryInterface } from '@/common/domain/repositories/repository.interface'
import { SupplierModel } from '../domain/models/suppliers.model'

export type CreateSupplierProps = {
  name: string
  description: string
  email: string
  phone: string
}

export interface SuppliersRepository
  extends RepositoryInterface<SupplierModel, CreateSupplierProps> {
  conflictingEmail(email: string): Promise<void>
}
