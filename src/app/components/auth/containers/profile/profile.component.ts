import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import {
  ProfileActiveTab,
  ProfileControls,
} from '../../models/profile-controls';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  profile: any;
  profileForm: FormGroup;
  isProfileSection = true;
  activeTab = ProfileActiveTab.profileSettings;
  hideOtpSection = true;
  isPasswordChange = false;
  hideMobileNumberActions = false;
  profileControls = ProfileControls;
  profileActiveTab = ProfileActiveTab;

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
    this.profileForm = this.fb.group({
      name: [{ value: '', disabled: true }],
      email: [{ value: '', disabled: true }],
      mobileNumber: [{ value: '', disabled: true }],
      otp: [{ value: '', disabled: true }],
      password: [{ value: '', disabled: true }],
      newPassword: [{ value: '', disabled: true }],
      confirmPassword: [{ value: '', disabled: true }],
    });

    this.profileForm.setValue({
      email: this.profile.email,
      mobileNumber: this.profile.mobileNumber.toString().slice(2),
      name: `${this.profile.firstName} ${this.profile.lastName}`,
      password: '***************',
      otp: '',
      newPassword: '',
      confirmPassword: '',
    });
  }

  onProfileSettingsClick(): void {
    this.isProfileSection = true;
    this.activeTab = ProfileActiveTab.profileSettings;
  }

  onManageAddressClick(): void {
    this.isProfileSection = false;
    this.activeTab = ProfileActiveTab.manageAddresses;
  }

  onChange(field: string): void {
    let formControlKeys = Object.keys(this.profileForm.controls);
    formControlKeys
      .filter((key) => key !== field)
      .forEach((key) => {
        this.profileForm.get(key)?.disable();
      });
    if (field === ProfileControls.password) {
      this.isPasswordChange = true;
      this.profileForm.get(ProfileControls.newPassword)?.enable();
      this.profileForm.get(ProfileControls.confirmPassword)?.enable();
    } else {
      this.isPasswordChange = false;
      this.hideOtpSection = true;
      this.hideMobileNumberActions = false;
      this.profileForm.get(field)?.enable();
    }
  }

  onUpdate(field: string): void {
    // API Call
    this.profileForm.get(field)?.disable();
  }

  onVerify(field: string): void {
    switch (field) {
      case ProfileControls.mobileNumber:
        this.hideOtpSection = false;
        this.profileForm.get(ProfileControls.otp)?.enable();
        this.profileForm.get(ProfileControls.mobileNumber)?.disable();
        this.hideMobileNumberActions = true;
        break;
      default:
        this.profileForm.get(field)?.disable();
        break;
    }
  }

  onCancel(field: string): void {
    switch (field) {
      case ProfileControls.name:
        this.profileForm
          .get(field)
          ?.patchValue(`${this.profile.firstName} ${this.profile.lastName}`);
        break;
      case ProfileControls.password:
        this.profileForm.get(field)?.patchValue('***************');
        break;
      case ProfileControls.mobileNumber:
        this.profileForm
          .get(field)
          ?.patchValue(this.profile.mobileNumber.toString().slice(2));
        break;
      case ProfileControls.confirmPassword:
        this.isPasswordChange = false;
        break;
      case ProfileControls.otp:
        this.hideOtpSection = true;
        this.hideMobileNumberActions = false;
        break;
      default:
        this.profileForm.get(field)?.patchValue(this.profile[field]);
        break;
    }
    this.profileForm.get(field)?.disable();
  }

  onConfirmOtp(): void {
    //API Call to confirm OTP
    this.hideOtpSection = true;
    this.hideMobileNumberActions = false;
  }
}
