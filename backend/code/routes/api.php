<?php

use App\Http\Controllers\LocationController;
use App\Http\Controllers\OrderController;
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
Route::apiResource('orders', OrderController::class);

// Restaurant
Route::get('restaurants/{id}/product-category-list', [RestaurantController::class, 'getProductCategoryList']);
Route::post('restaurants/{id}/upload/logo-image', [RestaurantController::class, 'uploadLogoImage']);
Route::get('restaurants/{id}/products', [RestaurantController::class, 'getProducts']);
Route::get('restaurants/{id}/product-categories', [RestaurantController::class, 'getProductCategories']);

// Product
Route::post('products/{id}/upload/product-image', [ProductController::class, 'uploadProductImage']);

// ProductCategory
Route::post('product-categories/{id}/upload/product-category-image', [ProductCategoryController::class, 'uploadImage']);
Route::get('product-categories/{id}/products', [ProductCategoryController::class, 'getProducts']);

// Location
Route::post('location/reverse', [LocationController::class, 'getLocationFromCoordinates']);
Route::post('location/query', [LocationController::class, 'getCoordinatesByQuery']);

// Public
Route::get('public/images/{fileName}', [RestaurantController::class, 'loadLogoImage']);