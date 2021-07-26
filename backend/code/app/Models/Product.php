<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'restaurant_id',
        'product_category_id',
        'name',
        'description',
        'image_url',
        'price_per_unit',
        'sales_price_per_unit',
        'tax_percentage',
        'in_stock',
        'is_active'
    ];

    /**
     * Get product category related to the product.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function productCategory()
    {
        return $this->belongsTo(ProductCategory::class);
    }

    /**
     * Get restaurant related to the product.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function restaurant()
    {
        return $this->belongsTo(Restaurant::class);
    }
}
