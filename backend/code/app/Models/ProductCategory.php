<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductCategory extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'restaurant_id',
        'name',
        'image_url',
        'is_active'
    ];

    /**
     * Get collection of products related to the product category.
     *
     * @return App\Models\Product[]
     */
    public function products()
    {
        return $this->hasMany(Product::class, 'product_category_id');
    }
}
