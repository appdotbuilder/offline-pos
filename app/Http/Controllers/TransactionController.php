<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Transaction;
use Inertia\Inertia;

class TransactionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $transactions = Transaction::with(['items.item'])
            ->latest()
            ->paginate(15)
            ->through(function ($transaction) {
                return [
                    'id' => $transaction->id,
                    'transaction_number' => $transaction->transaction_number,
                    'total_amount' => $transaction->total_amount,
                    'status' => $transaction->status,
                    'items_count' => $transaction->items->count(),
                    'created_at' => $transaction->created_at->format('Y-m-d H:i:s'),
                ];
            });

        return Inertia::render('transactions/index', [
            'transactions' => $transactions,
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Transaction $transaction)
    {
        $transaction->load(['items.item.category']);

        return Inertia::render('transactions/show', [
            'transaction' => [
                'id' => $transaction->id,
                'transaction_number' => $transaction->transaction_number,
                'subtotal' => $transaction->subtotal,
                'tax_amount' => $transaction->tax_amount,
                'discount_amount' => $transaction->discount_amount,
                'total_amount' => $transaction->total_amount,
                'paid_amount' => $transaction->paid_amount,
                'change_amount' => $transaction->change_amount,
                'status' => $transaction->status,
                'created_at' => $transaction->created_at->format('Y-m-d H:i:s'),
                'items' => $transaction->items->map(function ($item) {
                    return [
                        'id' => $item->id,
                        'item_name' => $item->item->name,
                        'item_barcode' => $item->item->barcode,
                        'category_name' => $item->item->category->name,
                        'uom_name' => $item->uom_name,
                        'quantity' => $item->quantity,
                        'unit_price' => $item->unit_price,
                        'subtotal' => $item->subtotal,
                    ];
                }),
            ],
        ]);
    }
}