<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrderLine extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'order_id',
        'product_id',
        'name',
        'description',
        'image_url',
        'price_per_unit',
        'sales_price_per_unit',
        'tax_percentage',
        'quantity'
    ];
}
