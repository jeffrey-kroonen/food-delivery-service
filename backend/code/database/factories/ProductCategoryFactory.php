<?php

namespace Database\Factories;

use App\Models\ProductCategory;
use Illuminate\Database\Eloquent\Factories\Factory;

class ProductCategoryFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = ProductCategory::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'name' => $this->faker->sentence(4),
            'image_url' => $this->faker->image('/app/public/img'),
            'is_active' => $this->faker->numberBetween(0, 1),
            'restaurant_id' => $this->faker->numberBetween(1, 100)
        ];
    }
}
