import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { race, Subject } from 'rxjs';
import { Address } from 'src/app/models/address';
import { Coordinates } from 'src/app/models/coordinates';
import { Restaurant } from 'src/app/models/restaurant';
import { LocationService } from 'src/app/services/location.service';
import { RestaurantService } from 'src/app/services/restaurant.service';

@Component({
  selector: 'app-manage-restaurant',
  templateUrl: './manage-restaurant.component.html',
  styleUrls: ['./manage-restaurant.component.css']
})
export class ManageRestaurantComponent implements OnInit {

  timeout: any = null;

  restaurant: Restaurant = new Restaurant();

  currentAddress!: Address;

  currentAddressString!: string;

  logoImageUrl!: string;

  minuteRange: number[] = [];

  formSubmitNotification!: string|undefined;

  addressSubmitNotification!: string|undefined;

  loadRestaurantProductsComponent: boolean = false;

  restaurantDetailsForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.maxLength(250)]),
    description: new FormControl('', [Validators.required, Validators.maxLength(2000)]),
    average_delivery_time: new FormControl('', Validators.required),
    delivery_charge: new FormControl('', Validators.required),
    minimum_order_amount: new FormControl('', Validators.required),
    delivery_radius: new FormControl('', Validators.required)
  });

  addressSuggestions: Address[] = [];

  constructor(private restaurantService: RestaurantService,
              private locationService: LocationService) { }

  ngOnInit(): void {
    this.handleSetRestaurant();
  }

  private handleInit(): void {
    this.handleRetrieveLogoImage();
    this.updateLogoImageUrl();
    this.generateMinutes();
    this.restaurantDetailsForm.patchValue(this.restaurant);
    this.getAddressByCoordinatesFromRestaurant();
  }

  handleSetRestaurant(): void {
    // TODO: Get restaurant id from authenticated user in future.
    this.restaurantService.getRestaurant(1).subscribe(data => {
      this.restaurant = data;
      this.handleInit();
    });
  }

  /**
   * Generate options for average delivery time.
   * 
   * @returns void
   */
  generateMinutes(): void {
    const steps = 10;
    const iteration = 12;

    for (let i = 1; i < (iteration + 1); i++) {
      this.minuteRange.push(i * steps);
    }
  }
  
  /**
   * Retrieve updates on the restaurant service
   * poperty logoImageUrl subscription.
   * 
   * @returns void
   */
  updateLogoImageUrl(): void {
    this.restaurantService.logoImageUrl.subscribe(
        data => {
          this.logoImageUrl = data
        }
    );
  }

  /**
   * Update currency of restaurant.
   * 
   * @param Event event 
   */
  handleCurrencyPreference(event: Event) {
    const target = event.target as HTMLInputElement;
    const currencyPreference = target.value;

    if (currencyPreference != this.restaurant.currency) {
      this.restaurantService.handleCurrencyPreference(this.restaurant.id, currencyPreference).subscribe(
        updatedRestaurant => {
          this.restaurant = updatedRestaurant;
        }
      );
    }
    
  }

  /**
   * Update metric of restaurant.
   * 
   * @param Event event 
   */
  handleMetricPreference(event: Event) {
    const target = event.target as HTMLInputElement;
    const metricPreference = target.value;

    if (metricPreference != this.restaurant.metric) {
      this.restaurantService.handleMetricPreference(this.restaurant.id, metricPreference).subscribe(
        updatedRestaurant => {
          this.restaurant = updatedRestaurant;
        }
      );
    }
  }

  /**
   * Load the logo image of restaurant.
   * 
   * @returns void
   */
  handleRetrieveLogoImage() {
    this.restaurantService.loadLogoImage(this.restaurant);
  }

  /**
   * Update the logo image of restaurant.
   * 
   * @param Event event 
   */
  handleFileInput(event: Event) {
    // Get file as object.
    const target = event.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];

    this.restaurantService.uploadLogoImage(this.restaurant.id, file);
  }

  /**
   * Update fields of restaurant after form submition.
   * 
   * @returns void
   */
  handleRestaurantDetailsFormSubmit(): void {
    const submittedForm = this.restaurantDetailsForm.value;
    // Map new values to current restaurant.
    this.restaurant.name = submittedForm.name;
    this.restaurant.description = submittedForm.description;
    this.restaurant.average_delivery_time = submittedForm.average_delivery_time;
    this.restaurant.delivery_charge = Number(submittedForm.delivery_charge.toString().replace(',', '.'));
    this.restaurant.minimum_order_amount = Number(submittedForm.minimum_order_amount.toString().replace(',', '.'));
    this.restaurant.delivery_radius = Number(submittedForm.delivery_radius.toString().replace(',', '.'));
    // Update the restaurant with the new values.
    this.restaurantService.updateRestaurant(this.restaurant.id, this.restaurant).subscribe(
      data => {
        this.handleFormSubmitNotification();
      }
    );
  }

  /**
   * Show user a notification after form submition.
   * 
   * @returns void
   */
  handleFormSubmitNotification(): void {
    this.formSubmitNotification = 'De velden zijn bijgewerkt.';

    setTimeout(() => {
      this.formSubmitNotification = undefined;
    }, 2000);
  }

  /**
   * Show user a notification after updating address.
   * 
   * @returns void
   */
  handleAddressSubmitNotifcation(): void {
    this.addressSubmitNotification = 'Het adres is bijgewerkt.';

    setTimeout(() => {
      this.addressSubmitNotification = undefined;
    }, 2000);
  }

  /**
   * Retrieve address based on coordinates of restaurant.
   * Set the needed properties.
   * 
   * @returns Address|void
   * @access private
   */
  private getAddressByCoordinatesFromRestaurant(): Address|void {
    const coordinates = {latitude: this.restaurant.latitude, longitude: this.restaurant.longitude} as Coordinates;
    this.locationService.getLocation(coordinates).subscribe(
      data => {
        this.currentAddress = data;
        this.currentAddressString = this.addressToString(this.currentAddress);
        return this.currentAddress;
      }
    );
  }

  /**
   * Retrieve location list based on enduser's search query.
   * 
   * @param Event event
   * @returns void 
   */
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

  /**
   * Return address string.
   * 
   * @param address 
   * @returns string
   */
  addressToStringSuggestions(address: Address) {
    return `${address.street_name} ${address.street_number}, ${address.postal_code} ${address.city}`;
  }

  /**
   * Build address string based on API response.
   * 
   * @param address 
   * @returns string
   */
  addressToString(address: Address) {
    return `${address.street_name} ${address.street_number}`;
  }

  /**
   * Update properties after location change.
   * 
   * @param Address address 
   */
  handleLocationChange(address: Address) {
    this.restaurant.latitude = address.coordinates.latitude;
    this.restaurant.longitude = address.coordinates.longitude;
    this.restaurantService.updateRestaurant(this.restaurant.id, this.restaurant).subscribe(
      data => {
        this.currentAddress = address;
        this.currentAddressString = this.addressToString(address);
        this.addressSuggestions = [];
        this.handleAddressSubmitNotifcation();
      }
    );
  }

  handleFocusoutClickEvent() {
    window.setTimeout(() => { this.addressSuggestions = [] }, 600);
  }


  handleLoadRestaurantProductsComponent() {
    this.loadRestaurantProductsComponent = true;
  }

  handleHideRestaurantProductsComponent() {
    this.loadRestaurantProductsComponent = false;
  }
}
