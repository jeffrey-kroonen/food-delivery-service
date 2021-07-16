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

  constructor(private restaurantService: RestaurantService) { }

  ngOnInit(): void {
    this.restaurantService.getRestaurant(2).subscribe(
      data => {
        this.currentRestaurant = data;
        this.handleRetrieveLogoImage();
        this.updateLogoImageUrl();
      }
    );
  }
  
  updateLogoImageUrl() {
    this.restaurantService.logoImageUrl.subscribe(
        data => {
          console.log(data);
          this.logoImageUrl = data
        }
    );
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
