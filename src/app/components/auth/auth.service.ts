import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AccountDetails } from './models/account-details';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  loginUserDetailSub$:BehaviorSubject<any>;

  public currentUser: Observable<any>;
  isloggedInUser = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient, private cookieService: CookieService) {
    this.loginUserDetailSub$ = new BehaviorSubject<any>(cookieService.get('userToken'));
    this.currentUser = this.loginUserDetailSub$.asObservable();
  }
  

  public get currentUserValue() {
    return this.loginUserDetailSub$.value;
}

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

  otpLogin$(otpLogin: AccountDetails) {
    return this.http.post(`${this.apiUrl}User/OTPLogin`, otpLogin);
  }

  resetPassword$(accountDetails: AccountDetails) {
    return this.http.post(`${this.apiUrl}User/Reset`, accountDetails);
  }

  getLoginUserDetails$():Observable<any> {
    return this.http.get(`${this.apiUrl}/api/UserProfile`);
  }

  setUserDetails() {
   // return of({name:"veeresh"});
    //this.loginUserDetailSub$.next({name:'veeresh'})
  }




}
