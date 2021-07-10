import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Restaurant } from 'src/app/models/restaurant';
import { RestaurantService } from 'src/app/services/restaurant.service';

@Component({
  selector: 'app-restaurant-products',
  templateUrl: './restaurant-products.component.html',
  styleUrls: ['./restaurant-products.component.css']
})
export class RestaurantProductsComponent implements OnInit {

  restaurant: Restaurant = new Restaurant();

  productCategoryList!: any;

  constructor(private restaurantService: RestaurantService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.handleRestaurantProducts();
    });
  }

  handleRestaurantProducts() {
    const restaurantId: number = Number(this.route.snapshot.paramMap.get('id'));

    // Fetch restaurant.
    this.restaurantService.getRestaurant(restaurantId).subscribe(
      data => {
        this.restaurant = data;
      }
    )
    // Fetch product category list.
    this.restaurantService.getProductsUnderProductCategories(restaurantId).subscribe(
      data => {
        this.productCategoryList = data;
      }
    );
  }

}