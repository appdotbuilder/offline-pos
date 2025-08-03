<?php

namespace Database\Factories;

use App\Models\Item;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Uom>
 */
class UomFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $conversionFactor = fake()->randomElement([1, 12, 24, 50, 100]);
        $baseCostPrice = fake()->randomFloat(2, 1, 10);
        $baseSalePrice = $baseCostPrice * 1.5;

        return [
            'item_id' => Item::factory(),
            'name' => fake()->randomElement(['ecer', 'grosir', 'lusin', 'kodi']),
            'conversion_factor' => $conversionFactor,
            'cost_price' => $baseCostPrice * $conversionFactor,
            'sale_price' => $baseSalePrice * $conversionFactor,
        ];
    }
}