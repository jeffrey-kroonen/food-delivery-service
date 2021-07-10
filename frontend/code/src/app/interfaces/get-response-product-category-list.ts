import { Product } from "../models/product";

export interface GetResponseProductCategoryList {
    product_categories: {
        name: string,
        description: string,
        image_url: string,
        products: Product[]
      }
}
