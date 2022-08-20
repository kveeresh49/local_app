import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AccountDetails } from './models/account-details';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}
  isloggedInUser = new BehaviorSubject<boolean>(false);

  get apiUrl(): string {
    return `${environment.devApi}`;
  }

  createUserAccount$(userAccountDetails: AccountDetails) {
    return this.http.post(`${this.apiUrl}User`, userAccountDetails);
  }

  userLogin$(userLoginDetails: AccountDetails) {
    return this.http.post(
      `${this.apiUrl}User/AuthenticateUser`,
      userLoginDetails
    );
  }

  otpLogin$(otpLogin: any) {
    return this.http.post(`${this.apiUrl}User/OTPLogin`, otpLogin);
  }

  resetPassword$(accountDetails: AccountDetails) {
    return this.http.post(`${this.apiUrl}User/Reset`, accountDetails);
  }
}
