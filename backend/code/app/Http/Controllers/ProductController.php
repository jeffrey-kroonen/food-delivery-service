<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
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
        return Product::all();
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
            'product_category_id' => 'required|exists:App\Models\ProductCategory,id',
            'name' => 'required|max:255',
            'description' => 'required|max:255',
            'price_per_unit' => 'required|max:255'
        ]);

        // Store new Product.
        $product = Product::create([
            'restaurant_id' => $validatedData['restaurant_id'], 
            'product_category_id' => $validatedData['product_category_id'],
            'name' => $validatedData['name'],
            'description' => $validatedData['description'],
            'image_url' => $request->image_url ?: '/img/image-placeholder.png',
            'price_per_unit' => $validatedData['price_per_unit'],
            'sales_price_per_unit' => $request->sales_price_per_unit ?: null,
            'tax_percentage' => $request->tax_percentage ?: 9.00, // Dutch VAT as default.
            'in_stock' => $request->in_stock ?: 1,
            'is_active' => $request->is_active ?: 1
        ]);

        // Return HTTP response to enduser.
        return response($product, 201)
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
        $product = Product::find($id);

        if (null === $product)
            return response()
                    ->noContent();

        return $product;
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


        $product = Product::find($id);
        $product->update($request->all());

        return $product;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(int $id)
    {
        $productDestroyCount = Product::destroy($id);

        if (0 === $productDestroyCount)
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
    public function uploadProductImage(int $id, Request $request)
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

        // Update the product with the new path to product image file.
        $product = Product::find($id);
        $product->image_url = '/img/' . $fileName;
        $product->save();

        // Return a success response.
        return response()->json([
            'message' => 'Successfully uploaded new product image.',
            'path' => url('/img/' . $fileName)
        ]);
    }
}
