<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Item;
use Illuminate\Http\Request;

class ItemSearchController extends Controller
{
    /**
     * Search for items by barcode or name.
     */
    public function index(Request $request)
    {
        $query = $request->get('query');
        
        if (!$query) {
            return response()->json([]);
        }

        $items = Item::with(['category', 'uoms'])
            ->where('is_active', true)
            ->where(function ($q) use ($query) {
                $q->where('barcode', 'like', "%{$query}%")
                  ->orWhere('name', 'like', "%{$query}%");
            })
            ->limit(10)
            ->get()
            ->map(function ($item) {
                return [
                    'id' => $item->id,
                    'barcode' => $item->barcode,
                    'name' => $item->name,
                    'category' => $item->category->name,
                    'stock_quantity' => $item->stock_quantity,
                    'smallest_unit' => $item->smallest_unit,
                    'uoms' => $item->uoms->map(function ($uom) {
                        return [
                            'name' => $uom->name,
                            'conversion_factor' => $uom->conversion_factor,
                            'sale_price' => $uom->sale_price,
                        ];
                    }),
                ];
            });

        return response()->json($items);
    }
}