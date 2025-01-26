import { ConflictError } from '@/common/domain/errors/conflict-error'
import { InMemoryRepository } from '@/common/domain/repositories/in-memory.repository'
import { SupplierModel } from '@/suppliers/domain/models/suppliers.model'
import { SuppliersRepository } from '@/suppliers/repositories/Suppliers.repository'

export class SuppliersInMemoryRepository
  extends InMemoryRepository<SupplierModel>
  implements SuppliersRepository
{
  async conflictingEmail(email: string): Promise<void> {
    const supplier = this.items.find((item) => item.email === email)

    if (supplier) {
      throw new ConflictError(
        `There is already a supplier using this email: ${email}`,
      )
    }
  }
}
