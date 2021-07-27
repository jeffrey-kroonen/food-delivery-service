import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { ProductCategory } from 'src/app/models/product-category';
import { Restaurant } from 'src/app/models/restaurant';
import { ProductCategoryService } from 'src/app/services/product-category.service';
import { RestaurantService } from 'src/app/services/restaurant.service';

@Component({
  selector: 'app-manage-product-categories',
  templateUrl: './manage-product-categories.component.html',
  styleUrls: ['./manage-product-categories.component.css']
})
export class ManageProductCategoriesComponent implements OnInit {

  restaurantLoaded: Subject<boolean> = new Subject<boolean>();
  producCategoriessLoaded: Subject<boolean> = new Subject<boolean>();

  restaurant: Restaurant = new Restaurant();
  productCategories: ProductCategory[] = [];

  constructor(private restaurantService: RestaurantService,
              private productCategoryService: ProductCategoryService) { }

  ngOnInit(): void {
    this.handleSetRestaurant();
    this.handleSetProductCategories();
  }

  handleSetRestaurant(): void {
    // TODO: Get restaurant id from authenticated user in future.
    this.restaurantService.getRestaurant(1).subscribe(data => {
      this.restaurant = data;
      this.restaurantLoaded.next(true);
    });
  }

  handleSetProductCategories(): void {
    this.restaurantLoaded.subscribe(() => {
      this.productCategoryService.getProductCategoriesByRestaurant(this.restaurant).subscribe(
        data => {
          this.productCategories = data;
          this.producCategoriessLoaded.next(true);
        });
    });
  }
}
