export class OrderLine {
    id!: number;
    order_id!: number;
    product_id!: number;
    name!: string;
    description!: string;
    image_url!: string;
    price_per_unit!: number;
    sales_price_per_unit!: number;
    tax_percentage!: number;
    quantity!: number;
    created_at!: Date;
    updated_at!: Date;
}
