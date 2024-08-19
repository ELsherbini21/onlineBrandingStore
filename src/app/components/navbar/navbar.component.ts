import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { NgIf } from '@angular/common';
import { setThrowInvalidWriteToSignalError } from '@angular/core/primitives/signals';
import { CartService } from '../../services/cart.service';
import { AnonymousSubject } from 'rxjs/internal/Subject';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, NgIf],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  isLogin: boolean = false;

  numberOfCart: number = 0;

  constructor(
    private _authService: AuthService,
    private _cartService: CartService
  ) {
    this.subscribeAt_numberOfCartItemsInCartService();
  }
  ngOnInit(): void {
    this.subscribeAtUserData();
  }

  logOut() {
    this._authService.logOut();
    // alert('k k');
  }
  subscribeAtUserData() {
    this._authService.userData.subscribe({
      next: () => {
        this.isLogin =
          this._authService.userData.getValue() != null ? true : false;
      },
      error: () => {},
      complete: () => {},
    });
  }

  subscribeAt_numberOfCartItemsInCartService() {
    this._cartService.numOfCartItems.subscribe({
      // next work when value of numOfCart in cart Service has changed .
      next: (value) => {
        this.numberOfCart = value;
        console.log('number of cart : ', this.numberOfCart);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
