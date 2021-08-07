import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart-append',
  templateUrl: './cart-append.component.html',
  styleUrls: ['./cart-append.component.css']
})
export class CartAppendComponent implements OnInit {
  @Input() product!: Product;
  counter: number = 1;
  totalPrice!: number;
  minCounter: number = 1;
  maxCounter: number = 99;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.totalPrice = this.product.price_per_unit;
  }

  decreaseCounter() {
    if (this.counter > this.minCounter) {
      this.counter--;
      this.computeTotalPrice();
    }
  }

  increaseCounter() {
    if (this.counter < this.maxCounter) {
      this.counter++;
      this.computeTotalPrice();
    }
  }

  computeTotalPrice() {
    this.totalPrice = this.product.price_per_unit * this.counter;
  }

  onAddToCart(): void {
    this.cartService.addToCart(this.product, this.counter);
  }

}
