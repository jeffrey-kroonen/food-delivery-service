<?php

namespace App\Services;

use App\Models\ProductCategory;
use App\Models\Restaurant;
use App\Services\Exceptions\ResourceNotFoundException;

class RestaurantService
{
    public function __construct()
    {
        //
    }

    /**
     * Display a List of ProductCategories with Product collections.
     *
     * @param int $restaurantId
     * @return array
     */
    public function getProductCategoryList(int $restaurantId)
    {
        $data = [];

        $restaurant = Restaurant::find($restaurantId);

        if (null === $restaurant)
            throw new ResourceNotFoundException('Restaurant not found.');

        // Fetch product categories by restaurant.
        $productCategories = $restaurant->productCategories;

        if ($productCategories->count() > 0) {
            // Loop over the ProductCategories.
            foreach ($productCategories as $productCategory) {
                // Fetch products by product category.
                $products = $productCategory->products;
                // Alter the markup and add it to the data array.
                $data[] = [
                    'name' => $productCategory->name,
                    'image_url' => $productCategory->image_url,
                    'products' => ($products->count() > 0) ? $products : []
                ];
            }
        }
            
        // Return the altered data set.
        return $data;
    }
}