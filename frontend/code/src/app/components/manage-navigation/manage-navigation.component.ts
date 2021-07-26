import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Product } from 'src/app/models/product';
import { Restaurant } from 'src/app/models/restaurant';
import { ProductService } from 'src/app/services/product.service';
import { RestaurantService } from 'src/app/services/restaurant.service';

@Component({
  selector: 'app-manage-navigation',
  templateUrl: './manage-navigation.component.html',
  styleUrls: ['./manage-navigation.component.css']
})
export class ManageNavigationComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
