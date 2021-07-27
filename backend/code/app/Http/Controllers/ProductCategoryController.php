<?php

namespace App\Http\Controllers;

use App\Models\ProductCategory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\URL;

class ProductCategoryController extends Controller
{
    private array $allowedImageFileMimeTypes = [
        'image/png',
        'image/jpeg',
        'image/webp'
    ];
    
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

    /**
     * Upload an image.
     *
     * @param integer $id
     * @param Request $request
     * @return \Illuminate\Http\Response
     */
    public function uploadImage(int $id, Request $request)
    {
        $file = $request->file('image');

        // Check if file is an image.
        if (!in_array($file->getClientMimeType(), $this->allowedImageFileMimeTypes)) {
            return response()->json(['message' => 'Invalid image file. Must be of type png, jp(e)g or webp'], 400);
        }

        $fileDoesNotExists = true;

        while ($fileDoesNotExists) {
            // Generate new file name.
            $fileName = bin2hex(random_bytes(5)) . '.' .  $file->getClientOriginalExtension();
            // Define path to file.
            $path = public_path('img') . '/' . $fileName;
            // Check if a file with generated new already exists.
            $fileDoesNotExists = file_exists($path);
        }
        // Move the file to local storage.
        $file->move(public_path('img'), $fileName);

        // Update the product category with the new path to image file.
        $productCategoryDestroyCount = ProductCategory::find($id);
        $productCategoryDestroyCount->image_url = '/img/' . $fileName;
        $productCategoryDestroyCount->save();

        // Return a success response.
        return response()->json([
            'message' => 'Successfully uploaded new image.',
            'path' => url('/img/' . $fileName)
        ]);
    }

    /**
     * Get products by given product category id.
     *
     * @param integer $id
     * @return \Illuminate\Http\JsonResponse|Illuminate\Database\Eloquent\Collection
     */
    public function getProducts(int $id)
    {
        $productCategory = ProductCategory::find($id);

        if (null === $productCategory)
            return response()
                    ->noContent();
        
        // Get products of product category.
        $products = $productCategory->products;

        // Fix url to product image url and add product category.
        foreach ($products as $product) {
            $product->image_url = URL::to('/') . $product->image_url;
            $product->product_category = $product->productCategory;
        }

        return $products;
    }
}
