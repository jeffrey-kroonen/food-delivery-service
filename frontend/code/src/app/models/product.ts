export class Product {
    
    id!: number;

    restaurant_id!: number;

    product_category_id!: number;

    name!: string;

    description!: string;

    image_url!: string;

    price_per_unit!: number;

    sales_price_per_unit!: number;

    tax_percentage!: number;

    in_stock!: boolean;

    is_active!: boolean;

    created_at!: Date;

    updated_at!: Date;

}
