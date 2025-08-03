<?php

namespace Database\Factories;

use App\Models\Category;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Item>
 */
class ItemFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $costPrice = fake()->randomFloat(2, 1, 50);
        $salePrice = $costPrice * fake()->randomFloat(2, 1.2, 2.5);

        return [
            'barcode' => fake()->unique()->ean13(),
            'name' => fake()->words(3, true),
            'description' => fake()->sentence(),
            'category_id' => Category::factory(),
            'stock_quantity' => fake()->numberBetween(0, 1000),
            'cost_price' => $costPrice,
            'sale_price' => $salePrice,
            'smallest_unit' => fake()->randomElement(['pcs', 'unit', 'item']),
            'is_active' => fake()->boolean(90),
        ];
    }
}