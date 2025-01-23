export interface FoodModel {
    id: string
    name: string
    quantity: number
    price: number
    supplier_id?: string
    created_at: Date
    updated_at: Date
}