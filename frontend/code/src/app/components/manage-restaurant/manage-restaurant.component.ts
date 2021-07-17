import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { race } from 'rxjs';
import { Restaurant } from 'src/app/models/restaurant';
import { RestaurantService } from 'src/app/services/restaurant.service';

@Component({
  selector: 'app-manage-restaurant',
  templateUrl: './manage-restaurant.component.html',
  styleUrls: ['./manage-restaurant.component.css']
})
export class ManageRestaurantComponent implements OnInit {

  currentRestaurant!: Restaurant;

  logoImageUrl!: string;

  minuteRange: number[] = [];

  submitNotifcation!: string|undefined;

  restaurantDetailsForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    average_delivery_time: new FormControl('', Validators.required),
    delivery_charge: new FormControl('', Validators.required),
    minimum_order_amount: new FormControl('', Validators.required),
    delivery_radius: new FormControl('', Validators.required)
  });

  constructor(private restaurantService: RestaurantService) { }

  ngOnInit(): void {
    this.restaurantService.getRestaurant(1).subscribe(
      data => {
        this.currentRestaurant = data;
        this.handleRetrieveLogoImage();
        this.updateLogoImageUrl();
        this.generateMinutes();
        this.restaurantDetailsForm.patchValue(this.currentRestaurant);
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
        this.submitNotification();
      }
    );
  }
  submitNotification() {
    this.submitNotifcation = 'De velden zijn bijgewerkt.';

    console.log(this.submitNotifcation);

    setTimeout(() => {
      this.submitNotifcation = undefined;
    }, 2000);
  }

}
