import { Component, OnInit } from '@angular/core';
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

  /**
   * Retrieve location from enduser or retrieve from
   * localstorage.
   * 
   * @return void
   */
  initLocation(): void {
    if (null === localStorage.getItem('currentAddress')) {
      this.handleGetLocation();
    } else {
      this.getLocationFromLocalStorage();
    }
  }

  /**
   * Set the new given address in localstorage.
   * 
   * @param Address address
   * @return void
   */
  private setLocationInLocalStorage(address: Address): void {
    localStorage.setItem('currentAddress', JSON.stringify(address));
  }

  /**
   * Retrieve address from localstorage.
   * 
   * @returns Address 
   */
  private getLocationFromLocalStorage(): Address {
    let currentAddress = JSON.parse(localStorage.getItem('currentAddress') || '{}') as Address;
    this.address = currentAddress;
    this.addressString = this.addressToString(this.address);
    return this.address;
  }

  /**
   * Get location from enduser.
   */
  handleGetLocation(): void {
    this.locationService.getPosition().then(
      coordinates => {
        this.locationService.getLocation(coordinates).subscribe(response => {
          this.address = response;
          this.addressString = this.addressToString(this.address);
        });
    });
  }

  /**
   * Build address string based on API response.
   * 
   * @param address 
   * @returns string
   */
  addressToString(address: Address) {
    let string = address.street_name;
    string += address.street_number != null ? ' ' + address.street_number : '';
    string += address.postal_code != null ? ', ' + address.postal_code : '';
    string += address.city != null && address.postal_code != null ? ' ' + address.city : '';
    string += address.city != null && address.postal_code == null ? ', ' + address.city : '';

    return string;
  }

  /**
   * Retrieve location list based on enduser's search query.
   * 
   * @param Event event
   * @returns void 
   */
  getLocationByQuery(event: Event): void {
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

  /**
   * Update properties after location change.
   * 
   * @param Address address 
   */
  handleLocationChange(address: Address): void {
    this.address = address;
    this.addressString = this.addressToString(this.address);
    this.setLocationInLocalStorage(this.address);
    this.addressSuggestions = [];
  }

  /**
   * Hold the focusout event to let the
   * user click on a address suggestion.
   * 
   * @returns void
   */
  handleFocusoutClickEvent(): void {
    window.setTimeout(() => { this.addressSuggestions = [] }, 600);
  }

}
