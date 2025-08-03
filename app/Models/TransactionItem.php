<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * App\Models\TransactionItem
 *
 * @property int $id
 * @property int $transaction_id
 * @property int $item_id
 * @property string $uom_name
 * @property int $quantity
 * @property float $unit_price
 * @property float $subtotal
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\Transaction $transaction
 * @property-read \App\Models\Item $item
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|TransactionItem newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|TransactionItem newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|TransactionItem query()
 * @method static \Illuminate\Database\Eloquent\Builder|TransactionItem whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TransactionItem whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TransactionItem whereItemId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TransactionItem whereQuantity($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TransactionItem whereSubtotal($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TransactionItem whereTransactionId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TransactionItem whereUomName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TransactionItem whereUnitPrice($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TransactionItem whereUpdatedAt($value)
 * @method static \Database\Factories\TransactionItemFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class TransactionItem extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'transaction_id',
        'item_id',
        'uom_name',
        'quantity',
        'unit_price',
        'subtotal',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'unit_price' => 'decimal:2',
        'subtotal' => 'decimal:2',
    ];

    /**
     * Get the transaction that owns the transaction item.
     */
    public function transaction(): BelongsTo
    {
        return $this->belongsTo(Transaction::class);
    }

    /**
     * Get the item that owns the transaction item.
     */
    public function item(): BelongsTo
    {
        return $this->belongsTo(Item::class);
    }
}