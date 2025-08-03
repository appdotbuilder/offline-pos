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
        Schema::create('transaction_items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('transaction_id')->constrained()->onDelete('cascade');
            $table->foreignId('item_id')->constrained()->onDelete('cascade');
            $table->string('uom_name')->comment('UOM name used in transaction');
            $table->integer('quantity')->comment('Quantity sold');
            $table->decimal('unit_price', 10, 2)->comment('Unit price for the UOM');
            $table->decimal('subtotal', 10, 2)->comment('Subtotal for this line item');
            $table->timestamps();
            
            $table->index('transaction_id');
            $table->index('item_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transaction_items');
    }
};