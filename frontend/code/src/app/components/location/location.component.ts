import { ThisReceiver } from '@angular/compiler';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { fromEvent } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { Address } from 'src/app/models/address';
import { LocationService } from 'src/app/services/location.service';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent implements OnInit {

  timeout: any = null;

  address!: Address;

  addressString!: string

  addressSuggestions: Address[] = [];

  constructor(private locationService: LocationService) { }

  ngOnInit(): void {
    this.initLocation();
  }

  initLocation(): void {
    if (null === localStorage.getItem('currentAddress')) {
      this.handleGetLocation();
    } else {
      this.getLocationFromLocalStorage();
      console.log(this.address);
    }
  }

  private setLocationInLocalStorage(address: Address): void {
    localStorage.setItem('currentAddress', JSON.stringify(address));
  }

  private getLocationFromLocalStorage(): Address {
    let currentAddress = JSON.parse(localStorage.getItem('currentAddress') || '{}') as Address;
    this.address = currentAddress;
    this.addressString = this.addressToString(this.address);
    return this.address;
  }

  handleGetLocation(): void {
    this.locationService.getPosition().then(
      coordinates => {
        this.locationService.getLocation(coordinates).subscribe(response => {
          this.address = response;
          this.addressString = this.addressToString(this.address);
        });
    });
  }

  addressToString(address: Address) {
    let string = address.street_name;
    string += address.street_number != null ? ' ' + address.street_number : '';
    string += address.postal_code != null ? ', ' + address.postal_code : '';
    string += address.city != null && address.postal_code != null ? ' ' + address.city : '';
    string += address.city != null && address.postal_code == null ? ', ' + address.city : '';

    return string;
  }

  getLocationByQuery(event: Event) {
    // Clear timeout
    clearTimeout(this.timeout);
    // Set new timeout value, so that the method waits till 
    // the first event trigger is finished.
    this.timeout = setTimeout(() => {
      const target = event.target as HTMLInputElement;
      // Retrieve the location collection by user input.
      if (target.value.length > 3) {
        this.locationService.getCollectionLocationsByQuery(target.value).subscribe(
          data => {
            // Validate the data that is received from Location IQ API.
            const validAddresses = data.filter(address => {
              if (null != address.street_name &&
                  null != address.street_number &&
                  null != address.postal_code &&
                  null != address.city)
                  {
                    return true;
                  }
                  return false;
            });

            this.addressSuggestions = validAddresses;            
          }, error => {
            // TODO Log error message.
          }
        );
      } else {
        this.addressSuggestions = [];
      }
      
    }, 600);
  }

  handleLocationChange(address: Address) {
    this.address = address;
    this.addressString = this.addressToString(this.address);
    this.setLocationInLocalStorage(this.address);
    this.addressSuggestions = [];
  }

  handleFocusoutClickEvent() {
    window.setTimeout(() => { this.addressSuggestions = [] }, 600);
  }

}
