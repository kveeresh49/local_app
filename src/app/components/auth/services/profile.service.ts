import {
  HttpClient,
  HttpClientModule,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ProfileUpdateRequest } from '../models/profile-update';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor(private http: HttpClient) {}

  get apiUrl(): string {
    return `${environment.API_ENDPOINTS.Api_url}`;
  }

  uploadProfilePic$(file: any, id: any) {
    return this.http.post(
      `${environment.API_ENDPOINTS.Api_url}UserProfile/UpdateProfileImage`,
      { ProfileImageFile: file, LoginID: id }
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
}
