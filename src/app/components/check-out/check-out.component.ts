import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CartService } from '../../services/cart.service';
import { IShippingAddress } from '../../ishipping-address';
@Component({
  selector: 'app-check-out',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './check-out.component.html',
  styleUrl: './check-out.component.css',
})
export class CheckOutComponent {
  constructor(private _cartService: CartService) {}

  stripeurl: string = '';

  shippingAddressForm: FormGroup = new FormGroup({
    details: new FormControl(null, [Validators.required]),
    phone: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^01[0125][0-9]{8}$/),
    ]),
    city: new FormControl(null, [Validators.required]),
  });

  hasError(property: string, flag: string): boolean {
    let control = this.shippingAddressForm.get(property);
    return control ? control.hasError(flag) : false;
  }

  onSubmit(shippingAddressForm: FormGroup) {
    console.log('___________ On Submit Shipping Addres method ________');
    console.log(shippingAddressForm.value);

    let shippAddressObject: IShippingAddress = {
      details: shippingAddressForm.value.details,
      phone: shippingAddressForm.value.phone,
      city: shippingAddressForm.value.city,
    };

    this._cartService
      .onlinePayment('66bf7664ed0dc0016c7a03eb', shippAddressObject)
      .subscribe({
        next: (response) => {
          this.stripeurl = response.session.url;
          console.log(this.stripeurl);
          let resultOfNavigation = this.navigateToUrl(this.stripeurl);
          console.log(resultOfNavigation);
        },
        error: (err) => console.log(err),
      });
  }

  navigateToUrl(url: string) {
    window.location.href = url;
  }
}
