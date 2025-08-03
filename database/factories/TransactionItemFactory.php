<?php

namespace Database\Factories;

use App\Models\Item;
use App\Models\Transaction;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\TransactionItem>
 */
class TransactionItemFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $quantity = fake()->numberBetween(1, 10);
        $unitPrice = fake()->randomFloat(2, 5, 100);
        $subtotal = $quantity * $unitPrice;

        return [
            'transaction_id' => Transaction::factory(),
            'item_id' => Item::factory(),
            'uom_name' => fake()->randomElement(['ecer', 'grosir', 'lusin']),
            'quantity' => $quantity,
            'unit_price' => $unitPrice,
            'subtotal' => $subtotal,
        ];
    }
}