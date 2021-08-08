<?php

namespace Database\Factories;

use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\Factory;

class ProductFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Product::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'restaurant_id' => $this->faker->numberBetween(1, 100),
            'product_category_id' => $this->faker->numberBetween(1, 200),
            'name' => $this->faker->sentence(4),
            'description' => $this->faker->sentence(8),
            'image_url' => $this->faker->image('/app/public/img'),
            'price_per_unit' => $this->faker->randomFloat(2, 5, 40),
            'sales_price_per_unit' => $this->faker->randomFloat(2, 5, 40),
            'tax_percentage' => 9,
            'in_stock' => $this->faker->numberBetween(0, 1),
            'is_active' => $this->faker->numberBetween(0, 1)
        ];
    }
}
