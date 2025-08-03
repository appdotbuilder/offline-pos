<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('items', function (Blueprint $table) {
            $table->id();
            $table->string('barcode')->unique()->comment('Item barcode');
            $table->string('name')->comment('Item name');
            $table->text('description')->nullable()->comment('Item description');
            $table->foreignId('category_id')->constrained()->onDelete('cascade');
            $table->integer('stock_quantity')->default(0)->comment('Stock quantity in smallest unit');
            $table->decimal('cost_price', 10, 2)->default(0)->comment('Cost price per smallest unit');
            $table->decimal('sale_price', 10, 2)->default(0)->comment('Sale price per smallest unit');
            $table->string('smallest_unit')->default('pcs')->comment('Smallest unit of measurement');
            $table->boolean('is_active')->default(true)->comment('Item status');
            $table->timestamps();
            
            $table->index('barcode');
            $table->index('name');
            $table->index('category_id');
            $table->index('is_active');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('items');
    }
};