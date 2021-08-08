import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  orderForm = new FormGroup({
    address: new FormGroup({
      street: new FormControl('', [Validators.required]),
      streetNumber: new FormControl('', [Validators.required]),
      postalCode: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required])
    }),
    personal: new FormGroup({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required])
    }),
    payment: new FormGroup({
      creditCardNumber: new FormControl('', [Validators.required]),
      CVVCSV: new FormControl('', [Validators.required]),
      expirationMonth: new FormControl('', [Validators.required]),
      expirationYear: new FormControl('', [Validators.required])
    })
  });

  constructor(private router: Router,
              private cartService: CartService,
              private orderService: OrderService) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    const submittedForm = this.orderForm.value;
    this.orderService.createOrder(submittedForm, this.cartService.cartItems).subscribe(response => {
      if (response.status === 201) {
        this.router.navigate([`/order-details/${response.body.order_id}`]);
      } else {
        alert('Er heeft zich een kritieke fout opgedaan, neem contact op met de beheerder.');
      }
    });
  }

}
