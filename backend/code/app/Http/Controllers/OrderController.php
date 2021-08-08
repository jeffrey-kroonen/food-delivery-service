<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use App\Models\Order;
use App\Models\OrderLine;
use App\Models\Product;
use App\Models\Restaurant;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        // Validate the posted fields.
        $validatedData = $request->validate([
            'street_name' => ['required', 'max:255'],
            'street_number' => ['required', 'max:255'],
            'postal_code' => ['required', 'max:255'],
            'city' => ['required', 'max:255'],
            'state' => ['required', 'max:255'],
            'country' => ['required', 'max:255'],
            'first_name' => ['required', 'max:255'],
            'last_name' => ['required', 'max:255'],
            'email' => ['required', 'max:255'],
            'phone_number' => ['required', 'max:255'],
            'cart_items' => ['required', 'array'],
            'notes' => ['max: 500'],
            'restaurant_id' => ['required', 'exists:App\Models\Restaurant,id']
        ]);

        $orderId = null;

        try {
            DB::transaction(function () use ($validatedData, &$orderId) {
                // Create new customer.
                $customer = new Customer();
                $customer->first_name = $validatedData['first_name'];
                $customer->last_name = $validatedData['last_name'];
                $customer->phone_number = $validatedData['phone_number'];
                $customer->email = $validatedData['email'];
                $customer->street_name = $validatedData['street_name'];
                $customer->street_number = $validatedData['street_number'];
                $customer->city = $validatedData['city'];
                $customer->postal_code = $validatedData['postal_code'];
                $customer->state = $validatedData['state'];
                $customer->country = $validatedData['country'];
                $customer->save();

                // Create new order.
                $order = new Order();
                $order->restaurant_id = $validatedData['restaurant_id'];
                $order->customer_id = $customer->id;
                $order->notes = $validatedData['notes'];
                $order->order_status = Order::$orderStatuses['OPEN'];
                $order->save();
                $orderId = $order->id;

                // Create new order lines.
                foreach ($validatedData['cart_items'] as $cartItem) {
                    $orderLine = new OrderLine();
                    $orderLine->order_id = $order->id;
                    $orderLine->product_id = $cartItem['product']['id'];
                    $orderLine->name = $cartItem['product']['name'];
                    $orderLine->description = $cartItem['product']['description'];
                    $orderLine->image_url = $cartItem['product']['image_url'];
                    $orderLine->price_per_unit = $cartItem['product']['price_per_unit'];
                    $orderLine->sales_price_per_unit = $cartItem['product']['sales_price_per_unit'];
                    $orderLine->tax_percentage = $cartItem['product']['tax_percentage'];
                    $orderLine->quantity = $cartItem['quantity'];
                    $orderLine->save();
                }
            }, 5);

            // Return a HTTP response on success.
            return response()->json(['order_id' => $orderId, 'message' => 'Created a new customer, order and order lines.'], 201);
        } catch (\Exception $e) {
            // Return a HTTP response on failure.
            return response()->json([
                'message' => 'Something wen\'t wrong while trying to process a new order.',
                'error_message' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
