import { Product } from "../models/product";

export interface GetResponseProductCategoryList {
    product_categories: {
        name: string,
        image_url: string,
        products: Product[]
      }
}
