<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreCategoryRequest;
use App\Http\Requests\UpdateCategoryRequest;
use App\Models\Category;
use Inertia\Inertia;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $categories = Category::withCount('items')
            ->latest()
            ->paginate(15)
            ->through(function ($category) {
                return [
                    'id' => $category->id,
                    'name' => $category->name,
                    'description' => $category->description,
                    'items_count' => $category->items_count,
                    'created_at' => $category->created_at->format('Y-m-d'),
                ];
            });

        return Inertia::render('categories/index', [
            'categories' => $categories,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('categories/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCategoryRequest $request)
    {
        $category = Category::create($request->validated());

        return redirect()->route('categories.show', $category)
            ->with('success', 'Category created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Category $category)
    {
        $category->load(['items' => function ($query) {
            $query->where('is_active', true)->latest();
        }]);

        return Inertia::render('categories/show', [
            'category' => [
                'id' => $category->id,
                'name' => $category->name,
                'description' => $category->description,
                'created_at' => $category->created_at->format('Y-m-d H:i:s'),
                'updated_at' => $category->updated_at->format('Y-m-d H:i:s'),
                'items' => $category->items->map(function ($item) {
                    return [
                        'id' => $item->id,
                        'barcode' => $item->barcode,
                        'name' => $item->name,
                        'stock_quantity' => $item->stock_quantity,
                        'sale_price' => $item->sale_price,
                        'is_active' => $item->is_active,
                    ];
                }),
            ],
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Category $category)
    {
        return Inertia::render('categories/edit', [
            'category' => $category,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCategoryRequest $request, Category $category)
    {
        $category->update($request->validated());

        return redirect()->route('categories.show', $category)
            ->with('success', 'Category updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Category $category)
    {
        // Check if category has items
        if ($category->items()->exists()) {
            return back()->withErrors(['error' => 'Cannot delete category that contains items.']);
        }

        $category->delete();

        return redirect()->route('categories.index')
            ->with('success', 'Category deleted successfully.');
    }
}