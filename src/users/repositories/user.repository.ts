import { RepositoryInterface } from '@/common/domain/repositories/repository.interface'
import { StatusPermission, UserModel } from '../domain/models/users.model'

export type CreateUserProps = {
  name: string
  email: string
  password: string
  roles: StatusPermission
}

export interface UsersRepository
  extends RepositoryInterface<UserModel, CreateUserProps> {
  findByEmail(email: string): Promise<UserModel>
  findByName(name: string): Promise<UserModel>
  conflictingEmail(email: string): Promise<void>
}
