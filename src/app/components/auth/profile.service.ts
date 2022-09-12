import {
  HttpClient,
  HttpClientModule,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor(private http: HttpClient) {}

  get apiUrl(): string {
    return `${environment.API_ENDPOINTS.Api_url}`;
  }

  uploadProfilePic$(file: any,id:any) {
    // const headers = new HttpHeaders({
    //   'Content-Type': 'multipart/form-data',
    // });

    // const setHeaders = { headers: headers };

    return this.http.post(
      `${environment.API_ENDPOINTS.Api_url}UserProfile/UpdateProfileImage`,
      { ProfileImageFile: file, LoginID: id }
     
    );
  }
}
