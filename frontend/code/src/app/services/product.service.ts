import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { GetResponseProductCategoryList } from '../interfaces/get-response-product-category-list';
import { Product } from '../models/product';
import { Restaurant } from '../models/restaurant';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  productImageUrls: Subject<string> = new Subject<string>();

  constructor(private httpClient: HttpClient) { }

  /**
   * Get the product image url and update 
   * the attribute of image_url of each product.
   * 
   * @param any productCategories 
   * @returns any modifiedProductCategories
   */
  getProductImageUrls(productCategories: any): string[] {
    let modifiedProductCategories: any = [];
    
    for (let productCategory of productCategories) {

      let products: any = [];
      
      for (let product of productCategory.products) {
        const fileName = (null != product.image_url) ? this.parseToImageFileName(product) : 'image-placeholder.png';
        const apiUrl = `${environment.backendBaseUrl}/public/images/${fileName}`
  
        this.httpClient.get<{path: string}>(apiUrl).subscribe(
          data => {
            product.image_url = data.path;
            products.push(product);
          }
        );
      }

      modifiedProductCategories.push({
        name: productCategory.name,
        image_url: productCategory.image_url,
        products: products
      });

    }

    return modifiedProductCategories;
  }

  getProductImageUrl(product: Product): Observable<{path: string}> {
    const fileName = (null != product.image_url) ? this.parseToImageFileName(product) : 'image-placeholder.png';
    const apiUrl = `${environment.backendBaseUrl}/public/images/${fileName}`
    
    return this.httpClient.get<{path: string}>(apiUrl);
  }

  /**
   * Parse product image url to file name.
   * 
   * @param Product product 
   * @returns string fileName
   */
   parseToImageFileName(product: Product): string {
    // Get file name.
    const logoImageUrlSubsets = product.image_url.split('/');
    const fileName = logoImageUrlSubsets.pop() || '';

    return fileName;
  }

  getProductsByRestaurant(restaurant: Restaurant): Observable<Product[]> {
    const apiUrl = `${environment.backendBaseUrl}/restaurants/${restaurant.id}/products`;

    return this.httpClient.get<Product[]>(apiUrl);
  }

  getProduct(productId: number): Observable<Product> {
    const apiUrl = `${environment.backendBaseUrl}/products/${productId}`;

    return this.httpClient.get<Product>(apiUrl);
  }

  uploadProductImage(product: Product, file: File): Observable<{message: string, path:string}> {
    const apiUrl = `${environment.backendBaseUrl}/products/${product.id}/upload/product-image`;
  
    // Data for request body.
    const formData = new FormData();
    formData.append('image', file);

    // Headers
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers.append('Accept', 'application/json');

    return this.httpClient.post<{message: string, path:string}>(apiUrl, formData, {headers: headers});
  }

  createProduct(id: number, product: Product): Observable<HttpResponse<Product>> {
    const apiUrl = `${environment.backendBaseUrl}/products`;

    // Headers
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers.append('Accept', 'application/json');

    return this.httpClient.post<Product>(apiUrl, product, {headers: headers, observe: 'response'});
  }

  updateProduct(id: number, product: Product): Observable<HttpResponse<Product>> {
    const apiUrl = `${environment.backendBaseUrl}/products/${id}`;

    // Headers
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers.append('Accept', 'application/json');

    return this.httpClient.put<Product>(apiUrl, product, {headers: headers, observe: 'response'});
  }

  deleteProduct(product: Product) {
    const apiUrl = `${environment.backendBaseUrl}/products/${product.id}`;

    // Headers
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers.append('Accept', 'application/json');

    return this.httpClient.delete(apiUrl, {headers: headers, observe: 'response'});
  }
}
