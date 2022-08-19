import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UserAccount } from './models/user-account';
import { UserDetails } from './models/user-deatils';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  get apiUrl(): string {
    return `${environment.devApi}`;
  }

  createUserAccount$(userAccountDetails: UserAccount) {
    return this.http.post(`${this.apiUrl}User`, userAccountDetails);
  }
  userLogin$(userLoginDetails:UserDetails) {
    return this.http.post(`${this.apiUrl}User/AuthenticateUser?userName=v1@gamil.com&password=111111`,{});
  }
}
