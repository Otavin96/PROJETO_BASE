import { FoodModel } from "@/foods/domain/models/foods.model";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity('foods')
export class Food implements FoodModel {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    quantity: number;
    
    @Column()
    price: number;

    @ManyToOne(() => Supplier, supplier => supplier.food, { nullable: true })
    supplier_id: Supplier;
    created_at: Date;
    updated_at: Date;

}