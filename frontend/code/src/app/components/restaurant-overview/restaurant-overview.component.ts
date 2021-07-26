import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Restaurant } from 'src/app/models/restaurant';
import { RestaurantService } from 'src/app/services/restaurant.service';

@Component({
  selector: 'app-restaurant-overview',
  templateUrl: './restaurant-overview.component.html',
  styleUrls: ['./restaurant-overview.component.css']
})
export class RestaurantOverviewComponent implements OnInit {

  restaurants: Restaurant[] = [];

  logoImageUrls: any = [];

  constructor(private restaurantService: RestaurantService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.listRestaurants();
    });
  }

  /**
   * Retrieve restaurants.
   * 
   * @returns void
   */
  listRestaurants(): void {
    this.restaurantService.getRestaurantList().subscribe(
      data => {
        this.restaurants = data;
        this.logoImageUrls = this.restaurantService.loadLogoImages(this.restaurants);
      }
    );
  }

}
