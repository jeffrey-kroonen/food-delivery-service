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

  timeout: any = null;

  restaurants: Restaurant[] = [];

  query: any = {};

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
      }
    );
  }

  /**
   * On search, retrieve restaurants.
   * 
   * @param Eventevent 
   */
  onSearch(event: Event) {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      const query: string = (event.target as HTMLInputElement).value;
      
      if (query.length <= 3) {
        delete this.query.search;
      } else {
        this.query.search = query;
      }

      this.applyQuery();
    });
  }

  /**
   * On filter, retrieve restaurants.
   * 
   * @param any queryFilter 
   */
  onQueryFilter(queryFilter: any) {
    this.query = queryFilter;
    this.applyQuery();
  }

  /**
   * Apply all filters to backend and retrieve restaurants.
   */
  applyQuery() {
    this.restaurantService.getRestaurantList(this.query).subscribe(data => this.restaurants = data);
  }
}
