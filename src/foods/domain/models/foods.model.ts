import { Supplier } from '@/suppliers/infrastructure/typeorm/entities/suppliers.entities'

export interface FoodModel {
  id: string
  name: string
  quantity: number
  price: number
  supplier_id: Supplier
  created_at: Date
  updated_at: Date
}
