import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { GetResponseAddress } from '../interfaces/get-response-address';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(private httpClient: HttpClient) { }

  /**
   * Retrieve address data from backend service. 
   * 
   * @param coordinates 
   * @returns 
   */
  getLocation(coordinates: Object): Observable<GetResponseAddress> {
    const apiUrl = `${environment.backendBaseUrl}/location/reverse`;

    return this.httpClient.post<GetResponseAddress>(apiUrl, coordinates);
  }

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

}
