import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { CartItem } from '../models/cart-item';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItems: CartItem[] = [];
  totalPrice: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  totalQuantity: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  constructor() { }

  addToCart(product: Product, quantity: number) {
    const productInCart = this.cartItems.find(cartItem => cartItem.product.id === product.id);

    if (!productInCart) {
      const cartItem = new CartItem();
      cartItem.product = product;
      cartItem.quantity = quantity;
      cartItem.price = cartItem.product.price_per_unit * cartItem.quantity;

      this.cartItems.push(cartItem);
    } else {
      const productInCartIndex = this.cartItems.findIndex(cartItem => cartItem.product.id === product.id);

      if (productInCartIndex === -1) {
        alert('Er is iets mis gegaan.');
        return;
      }

      productInCart.quantity += quantity;
      productInCart.price = productInCart.product.price_per_unit * productInCart.quantity;
      this.cartItems.splice(productInCartIndex, 1, productInCart);
    }

    this.computTotalPrice();
    this.computTotalQuantity();
  }

  updateCartItem(cartItem: CartItem): void {
    const productInCartIndex = this.cartItems.findIndex(currentCartItem => currentCartItem.product.id === cartItem.product.id);

    if (productInCartIndex === -1) {
      alert('Er is iets mis gegaan.');
      return;
    }

    this.cartItems.splice(productInCartIndex, 1, cartItem);
    this.computTotalPrice();
    this.computTotalQuantity();
  }

  deleteCartItem(cartItem: CartItem) {
    const productInCartIndex = this.cartItems.findIndex(currentCartItem => currentCartItem.product.id === cartItem.product.id);

    if (productInCartIndex === -1) {
      alert('Er is iets mis gegaan.');
      return;
    }

    this.cartItems.splice(productInCartIndex, 1);
    this.computTotalPrice();
    this.computTotalQuantity();
  }

  private computTotalPrice(): void {
    let totalPrice = 0;

    for (let cartItem of this.cartItems) {
      totalPrice += cartItem.product.price_per_unit * cartItem.quantity;
    }

    this.totalPrice.next(totalPrice);
  }

  private computTotalQuantity(): void {
    let totalQuantity = 0;

    for (let cartItem of this.cartItems) {
      totalQuantity += cartItem.quantity;
    }

    this.totalQuantity.next(totalQuantity);
  }
}
