export class Order {
    id!: number;
    restaurant_id!: number;
    customer_id!: number;
    notes!: string;
    order_status!: string;
    order_deliverd_at!: Date;
    created_at!: Date;
    updated_at!: Date;
}
