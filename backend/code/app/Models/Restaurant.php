<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Restaurant extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'description',
        'logo_image_url',
        'latitude',
        'longitude',
        'is_active'
    ];

    /**
     * Get collection of product categories related to the restaurant.
     *
     * @return App\Models\productCategories[]
     */
    public function productCategories()
    {
        return $this->hasMany(ProductCategory::class);
    }
}
