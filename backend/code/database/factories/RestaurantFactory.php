<?php

namespace Database\Factories;

use App\Models\Restaurant;
use Illuminate\Database\Eloquent\Factories\Factory;

class RestaurantFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Restaurant::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'name' => $this->faker->company(),
            'description' => $this->faker->paragraph(),
            'logo_image_url' => '/img/image-placeholder.png',
            'latitude' => $this->faker->latitude(),
            'longitude' => $this->faker->longitude(),
            'average_delivery_time' => $this->faker->numberBetween(15, 120),
            'currency' => $this->faker->randomElement(['EUR', 'USD']),
            'delivery_charge' => $this->faker->randomFloat(2, 0, 5),
            'minimum_order_amount' => $this->faker->randomFloat(2, 5, 15),
            'metric' => $this->faker->randomElement(['kilometers', 'miles']),
            'delivery_radius' => $this->faker->numberBetween(20, 50),
            'is_active' => $this->faker->numberBetween(0, 1)
        ];
    }
}
