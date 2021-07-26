import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { GetResponseProductCategoryList } from '../interfaces/get-response-product-category-list';
import { Product } from '../models/product';
import { ProductCategory } from '../models/product-category';
import { Restaurant } from '../models/restaurant';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  logoImageUrl: Subject<string> = new Subject<string>();

  constructor(private httpClient: HttpClient) { }

  /**
   * Retrieve restaurant based on id.
   * 
   * @param number restaurantId 
   * @returns Observable<Restaurant>
   */
  getRestaurant(restaurantId: number): Observable<Restaurant> {
    const apiUrl = `${environment.backendBaseUrl}/restaurants/${restaurantId}`;

    return this.httpClient.get<Restaurant>(apiUrl);
  }

  /**
   * Retrieve all restaurants.
   * 
   * @returns Observable<Restaurant[]>
   */
  getRestaurantList(): Observable<Restaurant[]> {
    const apiUrl = `${environment.backendBaseUrl}/restaurants`;

    return this.httpClient.get<Restaurant[]>(apiUrl);
  }

  /**
   * Retrieve products mapped under connected category.
   * 
   * @param number restaurantId 
   * @returns Observable<GetResponseProductCategoryList>
   */
  getProductsUnderProductCategories(restaurantId: number): Observable<GetResponseProductCategoryList> {
    const apiUrl = `${environment.backendBaseUrl}/restaurants/${restaurantId}/product-category-list`;

    return this.httpClient.get<GetResponseProductCategoryList>(apiUrl);
  }

  /**
   * Parse image logo url to file name.
   * 
   * @param Restaurant restaurant 
   * @returns string fileName
   */
  parseToImageFileName(restaurant: Restaurant): string {
    // Get file name.
    const logoImageUrlSubsets = restaurant.logo_image_url.split('/');
    const fileName = logoImageUrlSubsets.pop() || '';

    return fileName;
  }

  /**
   * Load logo's.
   * 
   * @param Restaurant restaurant 
   */
  loadLogoImage(restaurant: Restaurant) {
    const fileName = (restaurant.logo_image_url != null) ? this.parseToImageFileName(restaurant) : 'image-placeholder.png';
    const apiUrl = `${environment.backendBaseUrl}/public/images/${fileName}`

    this.httpClient.get<{path: string}>(apiUrl).subscribe(
      data => {
        this.logoImageUrl.next(data.path)
      }
    );
  }

  /**
   * Load multiple logo's.
   * 
   * @param Restaurant restaurant 
   * @returns string[] logoImageUrls
   */
  loadLogoImages(restaurants: Restaurant[]) {
    let logoImageUrls: string[] = [];

    for (let restaurant of restaurants) {
      const fileName = (restaurant.logo_image_url != null) ? this.parseToImageFileName(restaurant) : 'image-placeholder.png';
      const apiUrl = `${environment.backendBaseUrl}/public/images/${fileName}`

      this.httpClient.get<{path: string}>(apiUrl).subscribe(
        data => logoImageUrls.push(data.path)
      );
    }

    return logoImageUrls;
  }

  /**
   * Upload new logo image.
   * 
   * @param number restaurantId 
   * @param File file 
   */
  uploadLogoImage(restaurantId: number, file: File) {
    const apiUrl = `${environment.backendBaseUrl}/restaurants/${restaurantId}/upload/logo-image`
    
    // Form data
    const formData: FormData = new FormData();
    // formData.append('logo_image_url', imagePath);
    formData.append('image', file);

    // Headers
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers.append('Accept', 'application/json');

    return this.httpClient.post<{message: string, path:string}>(apiUrl, formData, {headers: headers}).subscribe(
      data => {
        this.logoImageUrl.next(data.path);
      }
    );
  }
  
  /**
   * Update restaurant data.
   * 
   * @param number restaurantId 
   * @param Restaurant restaurant 
   * @returns Observable<Restaurant>
   */
  updateRestaurant(restaurantId: number, restaurant: Restaurant): Observable<Restaurant> {
    const apiUrl = `${environment.backendBaseUrl}/restaurants/${restaurantId}`;

    // Headers
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers.append('Accept', 'application/json');

    return this.httpClient.put<Restaurant>(apiUrl, restaurant, {headers: headers});
  }

  /**
   * Update restaurant metric.
   * 
   * @param restaurantId 
   * @param metricyPreference 
   * @returns Observable<Restaurant>
   */
  handleMetricPreference(restaurantId: number, metricyPreference: string): Observable<Restaurant> {
    const apiUrl = `${environment.backendBaseUrl}/restaurants/${restaurantId}`;

    // Body
    const body: Object = {
      metric: metricyPreference
    };

    // Headers
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers.append('Accept', 'application/json');

    return this.httpClient.put<Restaurant>(apiUrl, body, {headers: headers});
  }

  /**
   * Update restaurant currency.
   * 
   * @param restaurantId 
   * @param currencyPreference 
   * @returns Observable<Restaurant>
   */
  handleCurrencyPreference(restaurantId: number, currencyPreference: string): Observable<Restaurant> {
    const apiUrl = `${environment.backendBaseUrl}/restaurants/${restaurantId}`;

    // Body
    const body: Object = {
      currency: currencyPreference
    };

    // Headers
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers.append('Accept', 'application/json');

    return this.httpClient.put<Restaurant>(apiUrl, body, {headers: headers});
  }

}
