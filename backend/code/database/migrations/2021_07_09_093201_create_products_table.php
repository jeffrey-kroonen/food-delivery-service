<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProductsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->foreignId('restaurant_id')->constrained('restaurants');
            $table->foreignId('product_category_id')->constrained('product_categories');
            $table->string('name');
            $table->string('description');
            $table->string('image_url');
            $table->decimal('price_per_unit', 6, 2);
            $table->decimal('sales_price_per_unit', 6, 2)->nullable();
            $table->decimal('tax_percentage', 6, 2);
            $table->boolean('in_stock')->default(1);
            $table->boolean('is_active')->default(1);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('products');
    }
}
