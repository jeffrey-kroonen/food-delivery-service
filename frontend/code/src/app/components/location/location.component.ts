import { Component, OnInit } from '@angular/core';
import { GetResponseAddress } from 'src/app/interfaces/get-response-address';
import { LocationService } from 'src/app/services/location.service';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent implements OnInit {

  address!: GetResponseAddress;

  addressString!: string

  constructor(private locationService: LocationService) { }

  ngOnInit(): void {
    this.handleGetLocation();
  }

  handleGetLocation(): void {
    this.locationService.getPosition().then(
      coordinates => {
        this.locationService.getLocation(coordinates).subscribe(response => {
          this.address = response;
          this.addressToString();
        });
    });
  }

  addressToString() {
    this.addressString = `${this.address?.street_name} ${this.address?.street_number}, ${this.address?.city}`;
  }

}
