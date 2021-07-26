import { Component, Input, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Product } from 'src/app/models/product';
import { Restaurant } from 'src/app/models/restaurant';
import { ProductService } from 'src/app/services/product.service';
import { RestaurantService } from 'src/app/services/restaurant.service';

@Component({
  selector: 'app-manage-products',
  templateUrl: './manage-products.component.html',
  styleUrls: ['./manage-products.component.css']
})
export class ManageProductsComponent implements OnInit {

  restaurantLoaded: Subject<boolean> = new Subject<boolean>();
  productsLoaded: Subject<boolean> = new Subject<boolean>();
  
  restaurant: Restaurant = new Restaurant();
  products: Product[] = [];

  constructor(private restaurantService: RestaurantService,
              private productService: ProductService) { }

  ngOnInit(): void {
    this.handleSetRestaurant();
    this.handleSetProducts();
  }

  handleSetRestaurant(): void {
    // TODO: Get restaurant id from authenticated user in future.
    this.restaurantService.getRestaurant(1).subscribe(data => {
      this.restaurant = data;
      this.restaurantLoaded.next(true);
    });
  }

  handleSetProducts(): void {
    this.restaurantLoaded.subscribe(() => {
      this.productService.getProductsByRestaurant(this.restaurant).subscribe(
        data => {
          this.products = data;
          this.productsLoaded.next(true);
        });
    });
  }

}
