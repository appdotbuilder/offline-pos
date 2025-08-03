<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Item;
use App\Models\Uom;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create test user
        User::factory()->create([
            'name' => 'POS Admin',
            'email' => 'admin@pos.com',
        ]);

        // Create categories
        $categories = [
            ['name' => 'Beverages', 'description' => 'Soft drinks, juices, and other beverages'],
            ['name' => 'Snacks', 'description' => 'Chips, crackers, and other snack foods'],
            ['name' => 'Dairy', 'description' => 'Milk, cheese, yogurt and dairy products'],
            ['name' => 'Household', 'description' => 'Cleaning supplies and household items'],
            ['name' => 'Personal Care', 'description' => 'Soap, shampoo, and personal hygiene items'],
        ];

        foreach ($categories as $categoryData) {
            $category = Category::create($categoryData);
            
            // Create items for each category
            $items = [
                // Beverages
                1 => [
                    ['barcode' => '1234567890123', 'name' => 'Coca Cola 330ml', 'stock_quantity' => 240, 'cost_price' => 2500, 'sale_price' => 3500],
                    ['barcode' => '1234567890124', 'name' => 'Pepsi 330ml', 'stock_quantity' => 180, 'cost_price' => 2400, 'sale_price' => 3400],
                    ['barcode' => '1234567890125', 'name' => 'Sprite 330ml', 'stock_quantity' => 200, 'cost_price' => 2450, 'sale_price' => 3450],
                ],
                // Snacks
                2 => [
                    ['barcode' => '2234567890123', 'name' => 'Lays Original 60g', 'stock_quantity' => 150, 'cost_price' => 3500, 'sale_price' => 5000],
                    ['barcode' => '2234567890124', 'name' => 'Pringles BBQ 110g', 'stock_quantity' => 80, 'cost_price' => 8500, 'sale_price' => 12000],
                    ['barcode' => '2234567890125', 'name' => 'Oreo Original 137g', 'stock_quantity' => 120, 'cost_price' => 4500, 'sale_price' => 6500],
                ],
                // Dairy
                3 => [
                    ['barcode' => '3234567890123', 'name' => 'Ultra Milk 250ml', 'stock_quantity' => 300, 'cost_price' => 3000, 'sale_price' => 4200],
                    ['barcode' => '3234567890124', 'name' => 'Cheese Kraft Singles', 'stock_quantity' => 60, 'cost_price' => 15000, 'sale_price' => 20000],
                    ['barcode' => '3234567890125', 'name' => 'Yogurt Cimory 120ml', 'stock_quantity' => 100, 'cost_price' => 4000, 'sale_price' => 5500],
                ],
                // Household
                4 => [
                    ['barcode' => '4234567890123', 'name' => 'Detergent Rinso 800g', 'stock_quantity' => 50, 'cost_price' => 12000, 'sale_price' => 16000],
                    ['barcode' => '4234567890124', 'name' => 'Tissue Paseo 250 sheets', 'stock_quantity' => 200, 'cost_price' => 8000, 'sale_price' => 11000],
                    ['barcode' => '4234567890125', 'name' => 'Soap Lifebuoy 85g', 'stock_quantity' => 180, 'cost_price' => 2500, 'sale_price' => 3500],
                ],
                // Personal Care
                5 => [
                    ['barcode' => '5234567890123', 'name' => 'Shampoo Pantene 170ml', 'stock_quantity' => 80, 'cost_price' => 15000, 'sale_price' => 21000],
                    ['barcode' => '5234567890124', 'name' => 'Toothpaste Pepsodent 120g', 'stock_quantity' => 100, 'cost_price' => 8500, 'sale_price' => 12500],
                    ['barcode' => '5234567890125', 'name' => 'Deodorant Rexona 150ml', 'stock_quantity' => 60, 'cost_price' => 18000, 'sale_price' => 25000],
                ],
            ];

            if (isset($items[$category->id])) {
                foreach ($items[$category->id] as $itemData) {
                    $itemData['category_id'] = $category->id;
                    $itemData['smallest_unit'] = 'pcs';
                    $itemData['is_active'] = true;
                    
                    $item = Item::create($itemData);
                    
                    // Create UOMs for each item
                    // Ecer (individual)
                    Uom::create([
                        'item_id' => $item->id,
                        'name' => 'ecer',
                        'conversion_factor' => 1,
                        'cost_price' => $item->cost_price,
                        'sale_price' => $item->sale_price,
                    ]);
                    
                    // Grosir (wholesale - 12 pieces)
                    Uom::create([
                        'item_id' => $item->id,
                        'name' => 'grosir',
                        'conversion_factor' => 12,
                        'cost_price' => $item->cost_price * 12 * 0.9, // 10% discount
                        'sale_price' => $item->sale_price * 12 * 0.95, // 5% discount
                    ]);
                    
                    // Lusin (dozen - 12 pieces, same as grosir but different name)
                    if (in_array($category->id, [1, 2, 3])) { // Only for certain categories
                        Uom::create([
                            'item_id' => $item->id,
                            'name' => 'lusin',
                            'conversion_factor' => 12,
                            'cost_price' => $item->cost_price * 12 * 0.92,
                            'sale_price' => $item->sale_price * 12 * 0.96,
                        ]);
                    }
                }
            }
        }
    }
}
