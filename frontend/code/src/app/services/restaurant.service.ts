import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { GetResponseProductCategoryList } from '../interfaces/get-response-product-category-list';
import { Product } from '../models/product';
import { ProductCategory } from '../models/product-category';
import { Restaurant } from '../models/restaurant';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  constructor(private httpClient: HttpClient) { }

  getRestaurant(restaurantId: number) {
    const apiUrl = `${environment.backendBaseUrl}/restaurants/${restaurantId}`;

    return this.httpClient.get<Restaurant>(apiUrl);
  }

  getRestaurantList(): Observable<Restaurant[]> {
    const apiUrl = `${environment.backendBaseUrl}/restaurants`;

    return this.httpClient.get<Restaurant[]>(apiUrl);
  }

  getProductsUnderProductCategories(restaurantId: number) {
    const apiUrl = `${environment.backendBaseUrl}/restaurants/${restaurantId}/product-category-list`;

    return this.httpClient.get<GetResponseProductCategoryList>(apiUrl);
  }
  

}
