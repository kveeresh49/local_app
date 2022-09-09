import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  profile: any;
  profileForm: FormGroup;
  constructor(private cookieService: CookieService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.profile = JSON.parse(this.cookieService.get('userProfile'));
    // TODO: This is for temporary purpose.
    this.profileForm = this.fb.group({
      email: [''],
      mobileNumber: [''],
      firstName: [''],
      lastName: [''],
      address: [''],
    });

    this.profileForm.setValue({
      email: this.profile.email,
      mobileNumber: this.profile.mobileNumber.toString().slice(2),
      firstName: this.profile.firstName,
      lastName: this.profile.lastName,
      address: this.profile.address ?? '',
    });
  }
}
