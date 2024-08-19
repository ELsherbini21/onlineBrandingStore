import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { CurrencyPipe, NgFor } from '@angular/common';
import { Route, Router, RouterLink } from '@angular/router';
import { ToastrService, ToastrModule } from 'ngx-toastr';
import { SettingsRoutingModule } from '../../settings/settings-routing.module';
import { config } from 'rxjs';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [NgFor, CurrencyPipe, RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit {
  productDetails: any = null;

  constructor(private _cartService: CartService, private _router: Router) {}

  ngOnInit(): void {
    this.getLoggedUserCart();
  }

  getLoggedUserCart() {
    this._cartService.getLoggedUserCart().subscribe({
      next: (response) => {
        this.productDetails = response.data;
        console.log(response.data);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  updateCartProductQuantity(idOfProduct: string, productQuantity: number) {
    this._cartService
      .updateCartProductQuantity(idOfProduct, productQuantity)
      .subscribe({
        next: (response) => {
          this.productDetails = response.data;
          console.log(response);
          alert('Updated success');
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  BridgeToRemoveEndPoint(productId: string) {
    let response = confirm('Do you want Confirm Delete this item ? ');
    if (response == true) {
      this.removespecificcartItem(productId);
    }
  }
  removespecificcartItem(productId: string) {
    this._cartService.removespecificcartItem(productId).subscribe({
      next: (response) => {
        // becasue after i make delete it will assing new response data for detail.s
        this.productDetails = response.data;
        console.log(response);
        alert('deleted success');

        // i do this when the response return , it will effect at property in serveice ,
        // then service it will effect in navbar .
        this._cartService.numOfCartItems.next(response.numOfCartItems);
        // this._router.navigate(['/cart']);
      },
      error: (err) => console.log(err),
    });
  }
}
