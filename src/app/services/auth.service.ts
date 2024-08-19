import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userData = new BehaviorSubject(null);

  private apiUrlForRegister = 'https://ecommerce.routemisr.com/api/v1/auth/signup';
  private apiUrlForLogin = 'https://ecommerce.routemisr.com/api/v1/auth/signin';

  constructor(private _httpClient: HttpClient, private _router: Router) {
    if(localStorage.getItem('userToken') !== null){
      this.decodeTokenThenGenerateUserData();
    }
  }

  register(userData: object): Observable<any> {
    return this._httpClient.post(this.apiUrlForRegister, userData);
  }

  login(userData: object): Observable<any> {
    return this._httpClient.post(this.apiUrlForLogin, userData);
  }

  logOut() {
    localStorage.removeItem('userToken');
    this.userData.next(null);
    this._router.navigate(['/home']);
  }

  decodeTokenThenGenerateUserData() {
    let encodedToken = JSON.stringify(localStorage.getItem('userToken'));
    let decodedToken: any = jwtDecode(encodedToken);
     console.log(decodedToken);
    this.userData.next(decodedToken);
  }
}
