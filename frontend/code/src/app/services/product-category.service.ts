import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Product } from '../models/product';
import { ProductCategory } from '../models/product-category';
import { Restaurant } from '../models/restaurant';

@Injectable({
  providedIn: 'root'
})
export class ProductCategoryService {

  constructor(private httpClient: HttpClient) { }

  createProductCategory(productCategroy: ProductCategory): Observable<HttpResponse<ProductCategory>> {
    const apiUrl: string = `${environment.backendBaseUrl}/product-categories`;

    return this.httpClient.post<ProductCategory>(apiUrl, productCategroy, {observe: 'response'});
  }

  updateProductCategory(id: number, productCategory: ProductCategory) {
    const apiUrl = `${environment.backendBaseUrl}/product-categories/${id}`;

    // Headers
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers.append('Accept', 'application/json');

    return this.httpClient.put<Product>(apiUrl, productCategory, {headers: headers, observe: 'response'});
  }

  uploadProductImage(productCategory: ProductCategory, file: File) {
    const apiUrl = `${environment.backendBaseUrl}/product-categories/${productCategory.id}/upload/product-category-image`;
  
    // Data for request body.
    const formData = new FormData();
    formData.append('image', file);

    // Headers
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers.append('Accept', 'application/json');

    return this.httpClient.post<{message: string, path:string}>(apiUrl, formData, {headers: headers});
  }

  deleteProductCategory(productCategory: ProductCategory) {
    const apiUrl = `${environment.backendBaseUrl}/product-categories/${productCategory.id}`;

    // Headers
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers.append('Accept', 'application/json');

    return this.httpClient.delete(apiUrl, {headers: headers, observe: 'response'});
  }

  retrieveAllProductCategories(): Observable<ProductCategory[]> {
    const apiUrl: string = `${environment.backendBaseUrl}/product-categories`;

    return this.httpClient.get<ProductCategory[]>(apiUrl);
  }

  getProductCategoriesByRestaurant(restaurant: Restaurant): Observable<ProductCategory[]> {
    const apiUrl: string = `${environment.backendBaseUrl}/restaurants/${restaurant.id}/product-categories`;

    return this.httpClient.get<ProductCategory[]>(apiUrl);
  }

  getProductCategory(productCategoryId: number) {
    const apiUrl: string = `${environment.backendBaseUrl}/product-categories/${productCategoryId}`;

    return this.httpClient.get<ProductCategory>(apiUrl);
  }

  getProductCategoryImageUrl(productCategory: ProductCategory): Observable<{path: string}> {
    const fileName = (null != productCategory.image_url) ? this.parseToImageFileName(productCategory) : 'image-placeholder.png';
    const apiUrl = `${environment.backendBaseUrl}/public/images/${fileName}`;

    return this.httpClient.get<{path: string}>(apiUrl);
  }

  /**
   * Parse image url to file name.
   * 
   * @param ProductCategory productCategory 
   * @returns string fileName
   */
   parseToImageFileName(productCategory: ProductCategory): string {
    // Get file name.
    const imageUrlSubsets = productCategory.image_url.split('/');
    const fileName = imageUrlSubsets.pop() || '';

    return fileName;
  }
}
