export enum StatusPermission {
  ADMIN = 'admin',
  USER = 'user',
}

export interface UserModel {
  id: string
  name: string
  email: string
  password: string
  avatar?: string
  roles: StatusPermission
  created_at: Date
  updated_at: Date
}
