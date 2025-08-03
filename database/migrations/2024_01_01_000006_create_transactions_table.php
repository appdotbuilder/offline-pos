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
        Schema::create('transactions', function (Blueprint $table) {
            $table->id();
            $table->string('transaction_number')->unique()->comment('Transaction number');
            $table->decimal('subtotal', 12, 2)->comment('Subtotal amount');
            $table->decimal('tax_amount', 12, 2)->default(0)->comment('Tax amount');
            $table->decimal('discount_amount', 12, 2)->default(0)->comment('Discount amount');
            $table->decimal('total_amount', 12, 2)->comment('Total amount');
            $table->decimal('paid_amount', 12, 2)->comment('Paid amount');
            $table->decimal('change_amount', 12, 2)->default(0)->comment('Change amount');
            $table->enum('status', ['pending', 'completed', 'cancelled'])->default('pending')->comment('Transaction status');
            $table->timestamps();
            
            $table->index('transaction_number');
            $table->index('status');
            $table->index('created_at');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transactions');
    }
};