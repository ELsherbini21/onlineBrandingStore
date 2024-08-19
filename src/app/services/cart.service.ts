import { provideAnimations } from '@angular/platform-browser/animations';
import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Token } from '@angular/compiler';
import { IShippingAddress } from '../ishipping-address';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  headers: any = { token: localStorage.getItem('userToken') };

  private apiUrl = 'https://ecommerce.routemisr.com/api/v1/cart';
  private localHostUrl = 'http://localhost:4200';
  private orderUrl =
    'https://ecommerce.routemisr.com/api/v1/orders/checkout-session';

  // observalbe i can make subcriebe on it from any where ,
  // if there are chagne in value , othrer place that subscribe at it will effect the change.
  numOfCartItems = new BehaviorSubject(0);

  constructor(private _httpClient: HttpClient) {
    this.subscribeAtGetLoggedUser();
  }

  // ngOnInit(): void {
  //   this.subscribeAtGetLoggedUser();
  // }

  addToCart(idOfProduct: string): Observable<any> {
    return this._httpClient.post(
      this.apiUrl,
      // body
      { productId: idOfProduct },
      // configurations or headers of Request
      {
        headers: this.headers,
      }
    );
  }

  updateCartProductQuantity(
    idOfProduct: string,
    proudctQuantity: number
  ): Observable<any> {
    return this._httpClient.put(
      this.apiUrl + '/' + idOfProduct,
      // body
      { count: proudctQuantity },
      // configurations or headers of Request
      {
        headers: this.headers,
      }
    );
  }

  getLoggedUserCart(): Observable<any> {
    return this._httpClient.get(this.apiUrl, {
      headers: this.headers,
    });
  }

  removespecificcartItem(idOfProduct: string): Observable<any> {
    return this._httpClient.delete(
      this.apiUrl + '/' + idOfProduct,
      // body
      {
        headers: this.headers,
      }
    );
  }

  onlinePayment(
    cartId: string,
    shippingAddress: IShippingAddress
  ): Observable<any> {
    return this._httpClient.post(
      `${this.orderUrl}/${cartId}?url=${this.localHostUrl}`,
      // body
      {
        shippingAddress: {
          details: shippingAddress.details,
          phone: shippingAddress.phone,
          city: shippingAddress.city,
        },
      },
      // configurations or headers of Request
      {
        headers: this.headers,
      }
    );
  }

  subscribeAtGetLoggedUser() {
    // when i open project this method executed .
    this.getLoggedUserCart().subscribe({
      next: (response) => {
        this.numOfCartItems.next(response.numOfCartItems);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
