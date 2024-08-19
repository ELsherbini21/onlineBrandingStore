import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrlForProduct = 'https://ecommerce.routemisr.com/api/v1/products';

  constructor(private _httpClient: HttpClient) {}

  getAll(): Observable<any> {
    return this._httpClient.get(this.apiUrlForProduct);
  }

  getProductById(id: string) {
    return this._httpClient.get(this.apiUrlForProduct + '/' + id);
  }
}
