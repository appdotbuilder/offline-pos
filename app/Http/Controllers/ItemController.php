<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreItemRequest;
use App\Http\Requests\UpdateItemRequest;
use App\Models\Category;
use App\Models\Item;
use App\Models\Uom;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class ItemController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $items = Item::with(['category', 'uoms'])
            ->latest()
            ->paginate(15)
            ->through(function ($item) {
                return [
                    'id' => $item->id,
                    'barcode' => $item->barcode,
                    'name' => $item->name,
                    'category' => $item->category->name,
                    'stock_quantity' => $item->stock_quantity,
                    'smallest_unit' => $item->smallest_unit,
                    'sale_price' => $item->sale_price,
                    'is_active' => $item->is_active,
                    'uoms_count' => $item->uoms->count(),
                ];
            });

        return Inertia::render('items/index', [
            'items' => $items,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('items/create', [
            'categories' => Category::orderBy('name')->get(['id', 'name']),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreItemRequest $request)
    {
        try {
            DB::beginTransaction();

            $item = Item::create($request->validated());

            // Create UOMs if provided
            if ($request->has('uoms')) {
                foreach ($request->uoms as $uomData) {
                    Uom::create([
                        'item_id' => $item->id,
                        'name' => $uomData['name'],
                        'conversion_factor' => $uomData['conversion_factor'],
                        'cost_price' => $uomData['cost_price'],
                        'sale_price' => $uomData['sale_price'],
                    ]);
                }
            }

            DB::commit();

            return redirect()->route('items.show', $item)
                ->with('success', 'Item created successfully.');

        } catch (\Exception $e) {
            DB::rollback();
            return back()->withErrors(['error' => 'Failed to create item: ' . $e->getMessage()]);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Item $item)
    {
        $item->load(['category', 'uoms']);

        return Inertia::render('items/show', [
            'item' => [
                'id' => $item->id,
                'barcode' => $item->barcode,
                'name' => $item->name,
                'description' => $item->description,
                'category' => $item->category,
                'stock_quantity' => $item->stock_quantity,
                'cost_price' => $item->cost_price,
                'sale_price' => $item->sale_price,
                'smallest_unit' => $item->smallest_unit,
                'is_active' => $item->is_active,
                'uoms' => $item->uoms,
                'created_at' => $item->created_at->format('Y-m-d H:i:s'),
                'updated_at' => $item->updated_at->format('Y-m-d H:i:s'),
            ],
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Item $item)
    {
        $item->load(['category', 'uoms']);

        return Inertia::render('items/edit', [
            'item' => [
                'id' => $item->id,
                'barcode' => $item->barcode,
                'name' => $item->name,
                'description' => $item->description,
                'category_id' => $item->category_id,
                'stock_quantity' => $item->stock_quantity,
                'cost_price' => $item->cost_price,
                'sale_price' => $item->sale_price,
                'smallest_unit' => $item->smallest_unit,
                'is_active' => $item->is_active,
                'uoms' => $item->uoms,
            ],
            'categories' => Category::orderBy('name')->get(['id', 'name']),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateItemRequest $request, Item $item)
    {
        try {
            DB::beginTransaction();

            $item->update($request->validated());

            // Update UOMs if provided
            if ($request->has('uoms')) {
                // Delete existing UOMs
                $item->uoms()->delete();
                
                // Create new UOMs
                foreach ($request->uoms as $uomData) {
                    Uom::create([
                        'item_id' => $item->id,
                        'name' => $uomData['name'],
                        'conversion_factor' => $uomData['conversion_factor'],
                        'cost_price' => $uomData['cost_price'],
                        'sale_price' => $uomData['sale_price'],
                    ]);
                }
            }

            DB::commit();

            return redirect()->route('items.show', $item)
                ->with('success', 'Item updated successfully.');

        } catch (\Exception $e) {
            DB::rollback();
            return back()->withErrors(['error' => 'Failed to update item: ' . $e->getMessage()]);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Item $item)
    {
        try {
            // Check if item has transaction history
            if ($item->transactionItems()->exists()) {
                return back()->withErrors(['error' => 'Cannot delete item with transaction history.']);
            }

            $item->delete();

            return redirect()->route('items.index')
                ->with('success', 'Item deleted successfully.');

        } catch (\Exception $e) {
            return back()->withErrors(['error' => 'Failed to delete item: ' . $e->getMessage()]);
        }
    }
}