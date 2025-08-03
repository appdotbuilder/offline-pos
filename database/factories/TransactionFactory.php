<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Transaction>
 */
class TransactionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $subtotal = fake()->randomFloat(2, 10, 500);
        $taxAmount = $subtotal * 0.1;
        $discountAmount = fake()->randomFloat(2, 0, $subtotal * 0.1);
        $totalAmount = $subtotal + $taxAmount - $discountAmount;
        $paidAmount = $totalAmount + fake()->randomFloat(2, 0, 50);
        $changeAmount = $paidAmount - $totalAmount;

        return [
            'transaction_number' => 'TXN-' . fake()->unique()->numerify('########'),
            'subtotal' => $subtotal,
            'tax_amount' => $taxAmount,
            'discount_amount' => $discountAmount,
            'total_amount' => $totalAmount,
            'paid_amount' => $paidAmount,
            'change_amount' => $changeAmount,
            'status' => fake()->randomElement(['pending', 'completed', 'cancelled']),
        ];
    }
}