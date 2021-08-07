import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product';
import { Restaurant } from 'src/app/models/restaurant';
import { ProductService } from 'src/app/services/product.service';
import { RestaurantService } from 'src/app/services/restaurant.service';

@Component({
  selector: 'app-restaurant-products',
  templateUrl: './restaurant-products.component.html',
  styleUrls: ['./restaurant-products.component.css']
})
export class RestaurantProductsComponent implements OnInit {

  restaurant: Restaurant = new Restaurant();

  productCategoryList!: any;

  productImageUrls: any = [];

  currentUrl!: string;

  activeProduct?: Product;

  constructor(private productService: ProductService,
              private restaurantService: RestaurantService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.handleRestaurantProducts();
    });
  }

  /**
   * Retrieve products ordered by category.
   * 
   * @returns void
   */
  handleRestaurantProducts(): void {
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
        this.productCategoryList = this.productService.getProductImageUrls(data);
      }
    );
  }

  onClick(product: Product): void {
    if (this.activeProduct == product) {
      this.activeProduct = undefined;
    } else {
      this.activeProduct = product;
    }
  }
}
