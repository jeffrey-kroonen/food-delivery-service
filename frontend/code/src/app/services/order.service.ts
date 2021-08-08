import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CartItem } from '../models/cart-item';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private httpClient: HttpClient) { }

  createOrder(orderForm: any, cartItems: CartItem[]) {
    const apiUrl = `${environment.backendBaseUrl}/orders`;

    const order = {
      street_name: orderForm.address.street,
      street_number: orderForm.address.streetNumber,
      postal_code: orderForm.address.postalCode,
      city: orderForm.address.city,
      state: '-',
      country: '-',
      first_name: orderForm.personal.firstName,
      last_name: orderForm.personal.lastName,
      email: orderForm.personal.email,
      phone_number: orderForm.personal.phone,
      cart_items: cartItems,
      notes: '',
      restaurant_id: cartItems[0].product.restaurant_id
    };

    // Headers
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers.append('Accept', 'application/json');

    return this.httpClient.post<any>(apiUrl, order, { headers: headers, observe: 'response' });
  }
}
