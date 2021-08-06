import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Restaurant } from 'src/app/models/restaurant';
import { RestaurantService } from 'src/app/services/restaurant.service';

@Component({
  selector: 'app-restaurant-filters',
  templateUrl: './restaurant-filters.component.html',
  styleUrls: ['./restaurant-filters.component.css']
})
export class RestaurantFiltersComponent implements OnInit {

  @Input() restaurantsCount?: number;
  
  @Output() queryFilterUsable: EventEmitter<Restaurant[]> = new EventEmitter<Restaurant[]>();

  queryFilter: any = {};

  constructor(private restaurantService: RestaurantService) { }

  ngOnInit(): void {
  }

  applyFilter() {
    this.queryFilterUsable.emit(this.queryFilter);
  }

  applyMinAmountFilter(filterAmount: number): void {
    if (filterAmount === -1) {
      delete this.queryFilter.minimum_order_amount;
    } else {
      this.queryFilter.minimum_order_amount = filterAmount;
    }
    this.applyFilter();
  }

  applyDeliveryChargeFilter(filterAmount: number): void {
    if (filterAmount === -1) {
      delete this.queryFilter.delivery_charge;
    } else {
      this.queryFilter.delivery_charge = filterAmount;
    }
    this.applyFilter();
  }
}
