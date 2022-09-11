import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AccountDetails } from './models/account-details';
import { EmailLoginModel, OtpLoginModel, PasswordResetModel } from './models/user-deatils';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  loginUserDetailSub$: BehaviorSubject<any>;

  public currentUser: Observable<any>;
  public userProfile: Observable<any>;
  isloggedInUser = new BehaviorSubject<boolean>(false);
  isUserProfileSub$ = new BehaviorSubject<any>({});

  constructor(private http: HttpClient, private cookieService: CookieService) {
    this.loginUserDetailSub$ = new BehaviorSubject<any>(
      cookieService.get('userToken')
    );
    this.currentUser = this.loginUserDetailSub$.asObservable();

    this.isUserProfileSub$ = new BehaviorSubject<any>(
      cookieService.get('userProfile')
    );
    this.userProfile = this.isUserProfileSub$.asObservable();
  }

  public get currentUserValue() {
    return this.loginUserDetailSub$.value;
  }

  public get isUserProfileValue() {
    return this.isUserProfileSub$.value;
  }

  get apiUrl(): string {
    return `${environment.API_ENDPOINTS.Api_url}`;
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


  resetPassword$(passwordResetObj: PasswordResetModel) {
    return this.http.post(`${this.apiUrl}User/Reset`, passwordResetObj);
  }

  getLoginUserDetails$(id: any): Observable<any> {
    return this.http.get(`${this.apiUrl}UserProfile/${id}`);
  }

  setUserDetails() {
    // return of({name:"veeresh"});
    //this.loginUserDetailSub$.next({name:'veeresh'})
  }

  sendOtp(mobileNumber: string) {
    let number = { mobileNumber: mobileNumber };
    return this.http.post(`${this.apiUrl}User/SendOTP`, number);
  }

  emailLogin$(emailLogin: EmailLoginModel) {
    return this.http.post(`${this.apiUrl}User/EmailLogin`, emailLogin);
  }

  otpLogin$(OtpLogin: OtpLoginModel) {
    return this.http.post(`${this.apiUrl}User/OTPLogin`, OtpLogin);
  }


  userProfile$(id: string) {
    return this.http.get(`${this.apiUrl}UserProfile/${id}`);
  }

  getGooglePlaces(API_KEY_Google:string) {
    return this.http.get(`https://maps.googleapis.com/maps/api/js?key=${API_KEY_Google}&libraries=places&callback=initMap`)
  }
}
