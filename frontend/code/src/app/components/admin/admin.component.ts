import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Restaurant } from 'src/app/models/restaurant';
import { RestaurantService } from 'src/app/services/restaurant.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  currentRestaurant!: Restaurant;

  logoImageUrl!: string;

  minuteRange: number[] = [];

  constructor(private restaurantService: RestaurantService) { }

  ngOnInit(): void {
    this.restaurantService.getRestaurant(1).subscribe(
      data => {
        this.currentRestaurant = data;
        this.handleRetrieveLogoImage();
        this.updateLogoImageUrl();
        this.generateMinutes();
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
          console.log(data);
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
          console.log(this.currentRestaurant);
        }
      );
    }
    
  }

  handleMetricPreference(event: Event) {
    const target = event.target as HTMLInputElement;
    const metricyPreference = target.value;

    if (metricyPreference != this.currentRestaurant.metric) {
      this.restaurantService.handleMetricPreference(this.currentRestaurant.id, metricyPreference).subscribe(
        updatedRestaurant => {
          this.currentRestaurant = updatedRestaurant;
          console.log(this.currentRestaurant);
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

}
