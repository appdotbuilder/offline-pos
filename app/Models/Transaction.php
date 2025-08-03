<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * App\Models\Transaction
 *
 * @property int $id
 * @property string $transaction_number
 * @property float $subtotal
 * @property float $tax_amount
 * @property float $discount_amount
 * @property float $total_amount
 * @property float $paid_amount
 * @property float $change_amount
 * @property string $status
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\TransactionItem> $items
 * @property-read int|null $items_count
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|Transaction newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Transaction newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Transaction query()
 * @method static \Illuminate\Database\Eloquent\Builder|Transaction whereChangeAmount($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Transaction whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Transaction whereDiscountAmount($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Transaction whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Transaction wherePaidAmount($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Transaction whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Transaction whereSubtotal($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Transaction whereTaxAmount($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Transaction whereTotalAmount($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Transaction whereTransactionNumber($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Transaction whereUpdatedAt($value)
 * @method static \Database\Factories\TransactionFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class Transaction extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'transaction_number',
        'subtotal',
        'tax_amount',
        'discount_amount',
        'total_amount',
        'paid_amount',
        'change_amount',
        'status',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'subtotal' => 'decimal:2',
        'tax_amount' => 'decimal:2',
        'discount_amount' => 'decimal:2',
        'total_amount' => 'decimal:2',
        'paid_amount' => 'decimal:2',
        'change_amount' => 'decimal:2',
    ];

    /**
     * Get the items for the transaction.
     */
    public function items(): HasMany
    {
        return $this->hasMany(TransactionItem::class);
    }
}