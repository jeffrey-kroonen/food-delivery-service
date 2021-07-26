import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ProductCategory } from '../models/product-category';

@Injectable({
  providedIn: 'root'
})
export class ProductCategoryService {

  constructor(private httpClient: HttpClient) { }

  createProductCategory(productCategroy: ProductCategory): Observable<ProductCategory> {
    const apiUrl: string = `${environment.backendBaseUrl}/product-categories`;

    return this.httpClient.post<ProductCategory>(apiUrl, productCategroy);
  }

  retrieveAllProductCategories(): Observable<ProductCategory[]> {
    const apiUrl: string = `${environment.backendBaseUrl}/product-categories`;

    return this.httpClient.get<ProductCategory[]>(apiUrl);
  }
}
