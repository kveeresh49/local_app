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
  isProfileSection = true;
  activeTab = 'profile';

  savedAddresses: any[] = [
    {
      type: 'home',
      city: 'R K Nagar, Secunderabad',
      area: 'R K Nagar west maredpally, secunderbad , Telangana, 500026, india',
    },
    {
      type: 'work',
      city: 'Gachibowli',
      area: 'Biodiversity, Gachibowli, Telangana, 50050, india',
    },
    {
      type: 'other',
      city: 'Jntu',
      area: 'Pragathi nagar, kukatpally, Jntu, Telangana, 500026, india',
    },
  ];

  constructor(private cookieService: CookieService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.profile = JSON.parse(this.cookieService.get('userProfile'));
    // TODO: This is for temporary purpose.
    this.profileForm = this.fb.group({
      name: [''],
      email: [''],
      mobileNumber: [''],
      otp: [''],
      password: [''],
    });

    this.profileForm.setValue({
      email: this.profile.email,
      mobileNumber: this.profile.mobileNumber.toString().slice(2),
      name: `${this.profile.firstName} ${this.profile.lastName}`,
      password: this.profile.password ?? '',
      otp: '',
    });
  }

  onProfileSettingsClick(): void {
    this.isProfileSection = true;
    this.activeTab = 'profile';
    // Custom logic for profile
  }

  onManageAddressClick(): void {
    this.isProfileSection = false;
    this.activeTab = 'addresses';
    // Custom logic for addresses
  }
}
