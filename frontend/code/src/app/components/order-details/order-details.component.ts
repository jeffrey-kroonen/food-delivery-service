import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Order } from 'src/app/models/order';
import { OrderLine } from 'src/app/models/order-line';
import { Restaurant } from 'src/app/models/restaurant';
import { OrderService } from 'src/app/services/order.service';
import { RestaurantService } from 'src/app/services/restaurant.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {
  order: Order = new Order();
  orderLines: OrderLine[] = [];
  restaurant: Restaurant = new Restaurant();

  constructor(private router: ActivatedRoute,
    private orderService: OrderService,
    private restaurantService: RestaurantService) { }

  ngOnInit(): void {
    this.handleGetOrder();
  }

  handleGetOrder(): void {
    const orderId: number = Number(this.router.snapshot.paramMap.get('id'));
    this.orderService.getOrder(orderId).subscribe(order => {
      this.order = order;
      this.handleGetOrderLines();
      this.handleGetRestaurant();
    });
  }

  handleGetOrderLines(): void {
    this.orderService.getOrderLines(this.order.id).subscribe(orderLines => this.orderLines = orderLines);
  }

  handleGetRestaurant(): void {
    this.restaurantService.getRestaurant(this.order.restaurant_id).subscribe(restaurant => this.restaurant = restaurant);
  }
}
