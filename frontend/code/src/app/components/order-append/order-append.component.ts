import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-order-append',
  templateUrl: './order-append.component.html',
  styleUrls: ['./order-append.component.css']
})
export class OrderAppendComponent implements OnInit {
  @Input() product!: Product;
  counter: number = 1;
  totalPrice!: number;
  minCounter: number = 1;
  maxCounter: number = 99;

  constructor() { }

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

}
