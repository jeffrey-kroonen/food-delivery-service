<?php

namespace App\Http\Controllers;

use App\Models\Restaurant;
use App\Services\RestaurantService;
use Exception;
use Illuminate\Http\Request;

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
            'description' => 'required|max:255',
            'logo_image_url' => 'required|max:255'
        ]);

        // Store new Restaurant.
        $restaurant = Restaurant::create([
            'name' => $validatedData['name'],
            'description' => $validatedData['description'],
            'logo_image_url' => $validatedData['logo_image_url'],
            'latitude' => $request->latitude ?: null,
            'longitude' => $request->longitude ?: null
        ]);

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

    public function uploadLogoImage(Request $request, int $id) 
    {
        $file = $request->file('image');

        $fileName = bin2hex(random_bytes(5)) . '.' .  $file->getClientOriginalExtension();

        $path = public_path('img') . '/' . $fileName;
        $file->move(public_path('img'), $fileName);

        $restaurant = Restaurant::find($id);
        $restaurant->logo_image_url = $path;
        $restaurant->save();
        
        return response()->json([
            'message' => 'Successfully uploaded new logo image.',
            'path' => url('/img/' . $fileName)
        ]);
    }

    public function loadLogoImage($fileName)
    {
        return response()->json(['path' => url('/img/' . $fileName)]);
    }
}
