<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * App\Models\Item
 *
 * @property int $id
 * @property string $barcode
 * @property string $name
 * @property string|null $description
 * @property int $category_id
 * @property int $stock_quantity
 * @property float $cost_price
 * @property float $sale_price
 * @property string $smallest_unit
 * @property bool $is_active
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\Category $category
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Uom> $uoms
 * @property-read int|null $uoms_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\TransactionItem> $transactionItems
 * @property-read int|null $transaction_items_count
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|Item newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Item newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Item query()
 * @method static \Illuminate\Database\Eloquent\Builder|Item whereBarcode($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Item whereCategoryId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Item whereCostPrice($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Item whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Item whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Item whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Item whereIsActive($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Item whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Item whereSalePrice($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Item whereSmallestUnit($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Item whereStockQuantity($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Item whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Item active()
 * @method static \Database\Factories\ItemFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class Item extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'barcode',
        'name',
        'description',
        'category_id',
        'stock_quantity',
        'cost_price',
        'sale_price',
        'smallest_unit',
        'is_active',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'cost_price' => 'decimal:2',
        'sale_price' => 'decimal:2',
        'is_active' => 'boolean',
    ];

    /**
     * Get the category that owns the item.
     */
    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    /**
     * Get the UOMs for the item.
     */
    public function uoms(): HasMany
    {
        return $this->hasMany(Uom::class);
    }

    /**
     * Get the transaction items for the item.
     */
    public function transactionItems(): HasMany
    {
        return $this->hasMany(TransactionItem::class);
    }

    /**
     * Scope a query to only include active items.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }
}