<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRestaurantsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('restaurants', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->text('description');
            $table->text('logo_image_url')->nullable();
            // $table->string('address');
            // $table->string('postcode');
            // $table->string('country');
            $table->decimal('latitude', 10, 8)->nullable();
            $table->decimal('longitude', 11, 8)->nullable();
            $table->boolean('is_active')->default(1);
            $table->integer('average_delivery_time');
            $table->enum('currency', ['EUR', 'USD'])->default('EUR');
            $table->decimal('delivery_charge', 8, 2);
            $table->decimal('minimum_order_amount', 8, 2);
            $table->enum('metric', ['kilometers', 'miles'])->default('kilometers');
            $table->decimal('delivery_radius', 8, 2);
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
        Schema::dropIfExists('restaurants');
    }
}
