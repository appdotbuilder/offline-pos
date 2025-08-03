<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * App\Models\Uom
 *
 * @property int $id
 * @property int $item_id
 * @property string $name
 * @property int $conversion_factor
 * @property float $cost_price
 * @property float $sale_price
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\Item $item
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|Uom newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Uom newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Uom query()
 * @method static \Illuminate\Database\Eloquent\Builder|Uom whereConversionFactor($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Uom whereCostPrice($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Uom whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Uom whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Uom whereItemId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Uom whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Uom whereSalePrice($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Uom whereUpdatedAt($value)
 * @method static \Database\Factories\UomFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class Uom extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'item_id',
        'name',
        'conversion_factor',
        'cost_price',
        'sale_price',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'cost_price' => 'decimal:2',
        'sale_price' => 'decimal:2',
    ];

    /**
     * Get the item that owns the UOM.
     */
    public function item(): BelongsTo
    {
        return $this->belongsTo(Item::class);
    }
}