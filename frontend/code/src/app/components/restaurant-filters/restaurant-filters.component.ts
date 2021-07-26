import { Component, Input, OnInit } from '@angular/core';
import { Restaurant } from 'src/app/models/restaurant';

@Component({
  selector: 'app-restaurant-filters',
  templateUrl: './restaurant-filters.component.html',
  styleUrls: ['./restaurant-filters.component.css']
})
export class RestaurantFiltersComponent implements OnInit {

  @Input() restaurants: Restaurant[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
