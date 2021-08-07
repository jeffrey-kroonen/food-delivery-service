import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  orderForm = new FormGroup({
    address: new FormGroup({
      street: new FormControl('', [ Validators.required ]),
      streetNumber: new FormControl('', [ Validators.required ]),
      postalCode: new FormControl('', [ Validators.required ]),
      city: new FormControl('', [ Validators.required ])
    }),
    personal: new FormGroup({
      firstName: new FormControl('', [ Validators.required ]),
      lastName: new FormControl('', [ Validators.required ]),
      email: new FormControl('', [ Validators.required ]),
      phone: new FormControl('', [ Validators.required ])
    }),
    payment: new FormGroup({
      creditCardNumber: new FormControl('', [ Validators.required ]),
      CVVCSV: new FormControl('', [ Validators.required ]),
      expirationMonth: new FormControl('', [ Validators.required ]),
      expirationYear: new FormControl('', [ Validators.required ])
    })
  });

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    
  }

}
