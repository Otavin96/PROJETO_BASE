import { ConflictError } from '@/common/domain/errors/conflict-error'
import { NotFoundError } from '@/common/domain/errors/not-found-error'
import { InMemoryRepository } from '@/common/domain/repositories/in-memory.repository'
import { UserModel } from '@/users/domain/models/users.model'
import { UsersRepository } from '@/users/repositories/user.repository'

export class UsersInMemoryRepository
  extends InMemoryRepository<UserModel>
  implements UsersRepository
{
  async findByEmail(email: string): Promise<UserModel> {
    const user = this.items.find((item) => item.email === email)

    if (!user) {
      throw new NotFoundError(`User not found using email ${email}`)
    }

    return user
  }
  async findByName(name: string): Promise<UserModel> {
    const user = this.items.find((item) => item.name === name)

    if (!user) {
      throw new NotFoundError(`User not found using name ${name}`)
    }

    return user
  }
  async conflictingEmail(email: string): Promise<void> {
    const user = this.items.find((item) => item.email === email)

    if (user) {
      throw new ConflictError('Email is already being used')
    }
  }
}
