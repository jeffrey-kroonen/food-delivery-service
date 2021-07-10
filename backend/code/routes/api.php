<?php

use App\Http\Controllers\ProductCategoryController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\RestaurantController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

// Resource
Route::apiResource('restaurants', RestaurantController::class);
Route::apiResource('products', ProductController::class);
Route::apiResource('product-categories', ProductCategoryController::class);

// Restaurant
Route::get('restaurants/{id}/product-category-list', [RestaurantController::class, 'getProductCategoryList']);