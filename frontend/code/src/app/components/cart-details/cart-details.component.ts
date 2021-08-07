import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartItem } from 'src/app/models/cart-item';
import { Restaurant } from 'src/app/models/restaurant';
import { CartService } from 'src/app/services/cart.service';
import { RestaurantService } from 'src/app/services/restaurant.service';

@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.css']
})
export class CartDetailsComponent implements OnInit {
  restaurant!: Restaurant;
  cartItems!: CartItem[];
  subTotalPrice!: number;
  totalPrice!: number;
  totalQuantity!: number;

  minCounter: number = 1;
  maxCounter: number = 99;

  constructor(private cartService: CartService,
              private restaurantService: RestaurantService,
              private router: ActivatedRoute) { }

  ngOnInit(): void {
    this.setCartItems();
    this.updateSubTotalPrice();
    this.updateTotalQuantity();
    this.getRestaurant(Number(this.router.snapshot.paramMap.get('id')));
  }

  getRestaurant(id: number) {
    this.restaurantService.getRestaurant(id).subscribe(restaurant => {
      this.restaurant = restaurant;
      this.totalPrice = this.subTotalPrice + Number(this.restaurant.delivery_charge);
    });
  }

  setCartItems(): void {
    this.cartItems = this.cartService.cartItems;
  }

  updateSubTotalPrice(): void {
    this.subTotalPrice = Number(this.cartService.totalPrice.getValue());
    this.cartService.totalPrice.subscribe(subTotalPrice => {
      this.subTotalPrice = subTotalPrice;

      if (this.restaurant !== undefined) {
        this.totalPrice = this.subTotalPrice + Number(this.restaurant.delivery_charge);
      }
    });
  }

  updateTotalQuantity(): void {
    this.totalQuantity = Number(this.cartService.totalQuantity.getValue());
    this.cartService.totalQuantity.subscribe(totalQuantity => this.totalQuantity = totalQuantity);
  }

  decreaseQuantity(cartItem: CartItem): void {
    if (cartItem.quantity > this.minCounter) {
      cartItem.quantity--;
      cartItem.price = cartItem.product.price_per_unit * cartItem.quantity;
      this.cartService.updateCartItem(cartItem);
    } else {
      this.cartService.deleteCartItem(cartItem);
    }
  }

  increaseQuantity(cartItem: CartItem): void {
    if (cartItem.quantity < this.maxCounter) {
      cartItem.quantity++;
      cartItem.price = cartItem.product.price_per_unit * cartItem.quantity;
      this.cartService.updateCartItem(cartItem);
    }
  }
}
