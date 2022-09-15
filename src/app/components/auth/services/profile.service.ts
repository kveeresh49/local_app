import {
  HttpClient,
  HttpClientModule,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ProfileUpdateRequest } from '../models/profile-update';
import { OtpLoginModel } from '../models/user-deatils';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor(private http: HttpClient) {}

  get apiUrl(): string {
    return `${environment.API_ENDPOINTS.Api_url}`;
  }

  uploadProfilePic$(formData: FormData) {
    const headers = new HttpHeaders({
      Accept: '*',
    });

    return this.http.put(
      `${environment.API_ENDPOINTS.Api_url}UserProfile/UpdateProfileImage`,
      formData,
      { headers: headers }
    );
  }

  updateProfile$(
    loginId: string,
    request: Array<ProfileUpdateRequest>
  ): Observable<any> {
    return this.http.patch(
      `${environment.API_ENDPOINTS.Api_url}UserProfile/${loginId}`,
      request
    );
  }

  verifyOtp$(otpRequest: OtpLoginModel): Observable<any> {
    return this.http.post(
      `${environment.API_ENDPOINTS.Api_url}User/VerifyOTP`,
      otpRequest
    );
  }

}
