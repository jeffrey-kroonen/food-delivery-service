import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Address } from '../models/address';
import { Coordinates } from '../models/coordinates';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(private httpClient: HttpClient) { }

  /**
   * Retrieve the longitude and latitude of 
   * the users current location.
   * 
   * @returns Promise
   */
   getPosition(): Promise<any> {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resp => {
        resolve({
          latitude: resp.coords.latitude,
          longitude: resp.coords.longitude
        });
      },
      err => {
        reject(err);
      }
      );
    });
  }

  /**
   * Retrieve address data from backend service by coordinates. 
   * 
   * @param coordinates 
   * @returns 
   */
  getLocation(coordinates: Coordinates): Observable<Address> {
    const apiUrl = `${environment.backendBaseUrl}/location/reverse`;

    return this.httpClient.post<Address>(apiUrl, coordinates);
  }

  getCollectionLocationsByQuery(keywords: string): Observable<Address[]> {
    const apiUrl = `${environment.backendBaseUrl}/location/query`;

    return this.httpClient.post<Address[]>(apiUrl, {keywords: keywords});
  }

}
