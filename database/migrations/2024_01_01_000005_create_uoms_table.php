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
        Schema::create('uoms', function (Blueprint $table) {
            $table->id();
            $table->foreignId('item_id')->constrained()->onDelete('cascade');
            $table->string('name')->comment('UOM name (e.g., ecer, grosir)');
            $table->integer('conversion_factor')->comment('Conversion factor to smallest unit');
            $table->decimal('cost_price', 10, 2)->default(0)->comment('Cost price for this UOM');
            $table->decimal('sale_price', 10, 2)->default(0)->comment('Sale price for this UOM');
            $table->timestamps();
            
            $table->index(['item_id', 'name']);
            $table->unique(['item_id', 'name']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('uoms');
    }
};