<?php

namespace App\Http\Controllers;

use App\Models\Restaurant;
use App\Services\RestaurantService;
use Exception;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\URL;
use Illuminate\Validation\Rule;

class RestaurantController extends Controller
{

    private RestaurantService $restaurantService;

    /**
     * Inject dependencies to controller.
     * 
     * @param App\Services\RestaurantService
     */
    public function __construct(RestaurantService $restaurantService)
    {
        $this->restaurantService = $restaurantService;
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Restaurant::all();
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
            'name' => 'required|unique:App\Models\Restaurant,name|max:255',
            'description' => 'required',
            'average_delivery_time' => 'required|integer',
            'currency' => ['size:3', Rule::in(['EUR', 'USD'])],
            'delivery_charge' => 'required',
            'minimum_order_amount' => 'required',
            'metric' => Rule::in(['kilometers', 'miles']),
            'delivery_radius' => 'required'
        ]);

        // Set data array for a new Restaurant.
        $restaurantData = [
            'name' => $validatedData['name'],
            'description' => $validatedData['description'],
            'latitude' => $request->latitude ?: null,
            'longitude' => $request->longitude ?: null,
            'average_delivery_time' => $validatedData['average_delivery_time'],
            'delivery_charge' => $validatedData['delivery_charge'],
            'minimum_order_amount' => $validatedData['minimum_order_amount'],
            'delivery_radius' => $validatedData['delivery_radius']
        ];
        // Set optional values for column currency.
        if (in_array('currency', $validatedData)) {
            $restaurantData['currency'] = $validatedData['currency'];
        }
        // Set optional values for column metric.
        if (in_array('metric', $validatedData)) {
            $restaurantData['metric'] = $validatedData['metric'];
        }

        // Store new Restaurant.
        $restaurant = Restaurant::create($restaurantData);

        // Return HTTP response to enduser.
        return response($restaurant, 201)
                    ->header('Content-Type', 'application/json');
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(int $id)
    {
        $restaurant = Restaurant::find($id);

        if (null === $restaurant)
            return response()
                    ->noContent();

        return $restaurant;
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, int $id)
    {
        if (0 === count($request->all()))
            return response()->json(['message' => 'No valid fields sent'], 400)
                    ->header('Content-Type', 'application/json');

        $restaurant = Restaurant::find($id);
        $restaurant->update($request->all());

        return $restaurant;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(int $id)
    {
        $restaurantDestroyCount = Restaurant::destroy($id);

        if (0 === $restaurantDestroyCount)
            return response()
                    ->noContent();

        return response(['message' => 'Resource deleted'], 200);
    }
    
    /**
     * Display ProductCategories with underlying products.
     * 
     * @param int $id - The id of the App\Models\Restaurant.
     * @return \Illuminate\Http\Response
     */
    public function getProductCategoryList(int $id) 
    {
        try {
            return $this->restaurantService->getProductCategoryList($id);
        } catch (Exception $e) {
            // Todo: Log error message with Laravel functionality.
            return response()->json(['message' => 'An error occurred while fetching the product category list.', 500]);
        }
    }

    /**
     * Upload an logo image for a restaurant.
     *
     * @param Request $request
     * @param integer $id
     * @return \Illuminate\Http\Response
     */
    public function uploadLogoImage(Request $request, int $id) 
    {
        $file = $request->file('image');

        $fileName = bin2hex(random_bytes(5)) . '.' .  $file->getClientOriginalExtension();

        $path = public_path('img') . '/' . $fileName;
        $file->move(public_path('img'), $fileName);

        $restaurant = Restaurant::find($id);
        $restaurant->logo_image_url = '/img/' . $fileName;
        $restaurant->save();
        
        return response()->json([
            'message' => 'Successfully uploaded new logo image.',
            'path' => url('/img/' . $fileName)
        ]);
    }

    /**
     * Display logo image by filename.
     *
     * @param [type] $fileName
     * @return void
     */
    public function loadLogoImage($fileName)
    {
        return response()->json(['path' => url('/img/' . $fileName)]);
    }

    /**
     * Get products by given restaurant id.
     *
     * @param integer $id
     * @return \Illuminate\Http\JsonResponse|Illuminate\Database\Eloquent\Collection
     */
    public function getProducts(int $id)
    {
        $restaurant = Restaurant::find($id);

        if (null === $restaurant)
            return response()
                    ->noContent();
        
        // Get products of restaurant.
        $products = $restaurant->products;

        // Fix url to product image url and add product category.
        foreach ($products as $product) {
            $product->image_url = URL::to('/') . $product->image_url;
            $product->product_category = $product->productCategory;
        }

        return $products;
    }

    /**
     * Get product categories by given restaurant id.
     *
     * @param integer $id
     * @return \Illuminate\Http\Response
     */
    public function getProductCategories(int $id)
    {
        $restaurant = Restaurant::find($id);

        if (null === $restaurant)
            return response()
                    ->noContent();

        // Get product categories of restaurant.
        $productCategories = $restaurant->productCategories;

        // Fix url to product image url and return new mapped array.
        return $productCategories->map(function ($productCategory) {
            $productCategory->image_url = !is_null($productCategory->image_url) ? (URL::to('/') . $productCategory->image_url) : null;
            $productCategory->products;
            return $productCategory;
        });
    }
}
