import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { race } from 'rxjs';
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

  currentRestaurant!: Restaurant;

  currentAddress!: Address;

  currentAddressString!: string;

  logoImageUrl!: string;

  minuteRange: number[] = [];

  formSubmitNotification!: string|undefined;

  addressSubmitNotification!: string|undefined;

  restaurantDetailsForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    average_delivery_time: new FormControl('', Validators.required),
    delivery_charge: new FormControl('', Validators.required),
    minimum_order_amount: new FormControl('', Validators.required),
    delivery_radius: new FormControl('', Validators.required)
  });

  addressSuggestions: Address[] = [];

  constructor(private restaurantService: RestaurantService,
              private locationService: LocationService) { }

  ngOnInit(): void {
    this.restaurantService.getRestaurant(1).subscribe(
      data => {
        this.currentRestaurant = data;
        this.handleRetrieveLogoImage();
        this.updateLogoImageUrl();
        this.generateMinutes();
        this.restaurantDetailsForm.patchValue(this.currentRestaurant);
        this.getAddressByCoordinatesFromRestaurant();
      }
    );
  }

  generateMinutes() {
    const steps = 10;
    const iteration = 12;

    for (let i = 1; i < (iteration + 1); i++) {
      this.minuteRange.push(i * steps);
    }
  }
  
  updateLogoImageUrl() {
    this.restaurantService.logoImageUrl.subscribe(
        data => {
          this.logoImageUrl = data
        }
    );
  }

  handleCurrencyPreference(event: Event) {
    const target = event.target as HTMLInputElement;
    const currencyPreference = target.value;

    if (currencyPreference != this.currentRestaurant.currency) {
      this.restaurantService.handleCurrencyPreference(this.currentRestaurant.id, currencyPreference).subscribe(
        updatedRestaurant => {
          this.currentRestaurant = updatedRestaurant;
        }
      );
    }
    
  }

  handleMetricPreference(event: Event) {
    const target = event.target as HTMLInputElement;
    const metricPreference = target.value;

    if (metricPreference != this.currentRestaurant.metric) {
      this.restaurantService.handleMetricPreference(this.currentRestaurant.id, metricPreference).subscribe(
        updatedRestaurant => {
          this.currentRestaurant = updatedRestaurant;
        }
      );
    }
  }

  handleRetrieveLogoImage() {
    this.restaurantService.loadLogoImage(this.currentRestaurant);
  }

  handleFileInput(event: Event) {
    // Get file as object.
    const target = event.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];

    // Get extension of file.
    const type = file.type.split('/');
    const extension = type.pop();

    // Generate randsom string
    let randomString = Math.random().toString(36).substring(5);

    this.restaurantService.uploadLogoImage(this.currentRestaurant.id, file);
  }

  handleRestaurantDetailsFormSubmit() {
    const submittedForm = this.restaurantDetailsForm.value;
    // Map new values to current restaurant.
    this.currentRestaurant.name = submittedForm.name;
    this.currentRestaurant.description = submittedForm.description;
    this.currentRestaurant.average_delivery_time = submittedForm.average_delivery_time;
    this.currentRestaurant.delivery_charge = Number(submittedForm.delivery_charge.toString().replace(',', '.'));
    this.currentRestaurant.minimum_order_amount = Number(submittedForm.minimum_order_amount.toString().replace(',', '.'));
    this.currentRestaurant.delivery_radius = Number(submittedForm.delivery_radius.toString().replace(',', '.'));
    // Update the restaurant with the new values.
    this.restaurantService.updateRestaurant(this.currentRestaurant.id, this.currentRestaurant).subscribe(
      data => {
        this.handleFormSubmitNotification();
      }
    );
  }

  handleFormSubmitNotification() {
    this.formSubmitNotification = 'De velden zijn bijgewerkt.';

    setTimeout(() => {
      this.formSubmitNotification = undefined;
    }, 2000);
  }

  handleAddressSubmitNotifcation() {
    this.addressSubmitNotification = 'Het adres is bijgewerkt.';

    setTimeout(() => {
      this.addressSubmitNotification = undefined;
    }, 2000);
  }

  private getAddressByCoordinatesFromRestaurant(): Address|void {
    const coordinates = {latitude: this.currentRestaurant.latitude, longitude: this.currentRestaurant.longitude} as Coordinates;
    this.locationService.getLocation(coordinates).subscribe(
      data => {
        this.currentAddress = data;
        this.currentAddressString = this.addressToString(this.currentAddress);
        return this.currentAddress;
      }
    );
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

  addressToStringSuggestions(address: Address) {
    return `${address.street_name} ${address.street_number}, ${address.postal_code} ${address.city}`;
  }

  addressToString(address: Address) {
    return `${address.street_name} ${address.street_number}`;
  }

  handleLocationChange(address: Address) {
    this.currentRestaurant.latitude = address.coordinates.latitude;
    this.currentRestaurant.longitude = address.coordinates.longitude;
    this.restaurantService.updateRestaurant(this.currentRestaurant.id, this.currentRestaurant).subscribe(
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

}
