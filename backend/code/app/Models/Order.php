<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'restaurant_id',
        'customer_id',
        'notes',
        'order_delivered_at'
    ];

    /**
     * The enum options for the attribute order_statuses.
     * 
     * @var array
     * @static
     */
    public static array $orderStatuses = [
        'UNPAID' => 'unpaid',
        'OPEN' => 'open',
        'COMPLETE' => 'complete',
        'CANCELED' => 'canceled'
    ];

    /**
     * Get collection of order lines related to the porder.
     *
     * @return App\Models\OrderLine[]
     */
    public function orderLines()
    {
        return $this->hasMany(OrderLine::class, 'order_id');
    }
}
