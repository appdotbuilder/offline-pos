<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ItemController;
use App\Http\Controllers\ItemSearchController;
use App\Http\Controllers\PosController;
use App\Http\Controllers\TransactionController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/health-check', function () {
    return response()->json([
        'status' => 'ok',
        'timestamp' => now()->toISOString(),
    ]);
})->name('health-check');

// Main POS interface on home page
Route::get('/', [PosController::class, 'index'])->name('home');
Route::get('/pos/search', [ItemSearchController::class, 'index'])->name('pos.search');
Route::post('/pos/transaction', [PosController::class, 'store'])->name('pos.transaction');

// Inventory management routes
Route::resource('categories', CategoryController::class);
Route::resource('items', ItemController::class);
Route::resource('transactions', TransactionController::class)->only(['index', 'show']);

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
