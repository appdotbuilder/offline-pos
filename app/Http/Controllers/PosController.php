<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Item;
use App\Models\Transaction;
use App\Models\TransactionItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class PosController extends Controller
{
    /**
     * Display the POS interface.
     */
    public function index()
    {
        return Inertia::render('pos', [
            'recentTransactions' => Transaction::with('items.item')
                ->latest()
                ->take(5)
                ->get()
                ->map(function ($transaction) {
                    return [
                        'id' => $transaction->id,
                        'transaction_number' => $transaction->transaction_number,
                        'total_amount' => $transaction->total_amount,
                        'status' => $transaction->status,
                        'created_at' => $transaction->created_at->format('Y-m-d H:i:s'),
                        'items_count' => $transaction->items->count(),
                    ];
                }),
        ]);
    }

    /**
     * Process a transaction.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'items' => 'required|array|min:1',
            'items.*.item_id' => 'required|exists:items,id',
            'items.*.uom_name' => 'required|string',
            'items.*.quantity' => 'required|integer|min:1',
            'items.*.unit_price' => 'required|numeric|min:0',
            'paid_amount' => 'required|numeric|min:0',
            'discount_amount' => 'nullable|numeric|min:0',
        ]);

        try {
            DB::beginTransaction();

            // Calculate totals
            $subtotal = 0;
            foreach ($validated['items'] as $item) {
                $subtotal += $item['quantity'] * $item['unit_price'];
            }

            $discountAmount = $validated['discount_amount'] ?? 0;
            $taxAmount = ($subtotal - $discountAmount) * 0.1; // 10% tax
            $totalAmount = $subtotal + $taxAmount - $discountAmount;
            $paidAmount = $validated['paid_amount'];
            $changeAmount = $paidAmount - $totalAmount;

            // Create transaction
            $transaction = Transaction::create([
                'transaction_number' => 'TXN-' . now()->format('YmdHis') . '-' . random_int(1000, 9999),
                'subtotal' => $subtotal,
                'tax_amount' => $taxAmount,
                'discount_amount' => $discountAmount,
                'total_amount' => $totalAmount,
                'paid_amount' => $paidAmount,
                'change_amount' => $changeAmount,
                'status' => 'completed',
            ]);

            // Create transaction items and update stock
            foreach ($validated['items'] as $itemData) {
                $item = Item::find($itemData['item_id']);
                if (!$item) {
                    throw new \Exception("Item not found");
                }
                
                /** @var \App\Models\Uom|null $uom */
                $uom = $item->uoms()->where('name', $itemData['uom_name'])->first();
                if (!$uom) {
                    throw new \Exception("UOM {$itemData['uom_name']} not found for item {$item->name}");
                }

                // Create transaction item
                TransactionItem::create([
                    'transaction_id' => $transaction->id,
                    'item_id' => $item->id,
                    'uom_name' => $itemData['uom_name'],
                    'quantity' => $itemData['quantity'],
                    'unit_price' => $itemData['unit_price'],
                    'subtotal' => $itemData['quantity'] * $itemData['unit_price'],
                ]);

                // Update stock (convert to smallest unit)
                $stockReduction = $itemData['quantity'] * $uom->conversion_factor;
                $item->decrement('stock_quantity', $stockReduction);
            }

            DB::commit();

            return response()->json([
                'success' => true,
                'transaction' => [
                    'id' => $transaction->id,
                    'transaction_number' => $transaction->transaction_number,
                    'total_amount' => $transaction->total_amount,
                    'change_amount' => $transaction->change_amount,
                ],
            ]);

        } catch (\Exception $e) {
            DB::rollback();
            return response()->json([
                'success' => false,
                'message' => 'Transaction failed: ' . $e->getMessage(),
            ], 500);
        }
    }
}