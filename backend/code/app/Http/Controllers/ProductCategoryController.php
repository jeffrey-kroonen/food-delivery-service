<?php

namespace App\Http\Controllers;

use App\Models\ProductCategory;
use Illuminate\Http\Request;

class ProductCategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return ProductCategory::all();
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
            'restaurant_id' => 'required|exists:App\Models\Restaurant,id',
            'name' => 'required|max:255'
        ]);

        // Store new ProductCategory.
        $productCategory = ProductCategory::create([
            'restaurant_id' => $validatedData['restaurant_id'],
            'name' => $validatedData['name'],
            'image_url' => $request->image_url ?: '/img/image-placeholder.png'
        ]);

        // Return HTTP response to enduser.
        return response($productCategory, 201)
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
        $productCategory = ProductCategory::find($id);

        if (null === $productCategory)
            return response()
                    ->noContent();

        return $productCategory;
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


        $productCategory = ProductCategory::find($id);
        $productCategory->update($request->all());

        return $productCategory;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(int $id)
    {
        $productCategoryDestroyCount = ProductCategory::destroy($id);

        if (0 === $productCategoryDestroyCount)
            return response()
                    ->noContent();

        return response(['message' => 'Resource deleted'], 200);
    }
}
