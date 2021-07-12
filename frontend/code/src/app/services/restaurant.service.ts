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

  getRestaurant(restaurantId: number): Observable<Restaurant> {
    const apiUrl = `${environment.backendBaseUrl}/restaurants/${restaurantId}`;

    return this.httpClient.get<Restaurant>(apiUrl);
  }

  getRestaurantList(): Observable<Restaurant[]> {
    const apiUrl = `${environment.backendBaseUrl}/restaurants`;

    return this.httpClient.get<Restaurant[]>(apiUrl);
  }

  getProductsUnderProductCategories(restaurantId: number): Observable<GetResponseProductCategoryList> {
    const apiUrl = `${environment.backendBaseUrl}/restaurants/${restaurantId}/product-category-list`;

    return this.httpClient.get<GetResponseProductCategoryList>(apiUrl);
  }

  loadLogoImage(fileName: string) {
    const apiUrl = `${environment.backendBaseUrl}/public/images/${fileName}`

    this.httpClient.get<{path: string}>(apiUrl).subscribe(
      data => {
        this.logoImageUrl.next(data.path)
      }
    );
  }

  uploadLogoImage(restaurantId: number, file: File) {
    const apiUrl = `${environment.backendBaseUrl}/restaurants/${restaurantId}/upload/logo-image`
    
    // Form data
    const formData: FormData = new FormData();
    // formData.append('logo_image_url', imagePath);
    formData.append('image', file);

    // Headers
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');

    return this.httpClient.post<{message: string, path:string}>(apiUrl, formData, {headers: headers}).subscribe(
      data => {
        this.logoImageUrl.next(data.path);
        console.log(JSON.stringify(data));
      }
    );
  }
  

}
