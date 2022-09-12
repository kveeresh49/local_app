import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import Validation from 'src/app/shared/utils/validation';
import {
  ProfileActiveTab,
  ProfileControls,
} from '../../models/profile-controls';
import { ProfileService } from '../../profile.service';

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
  alerts :any = [];

  constructor(private cookieService: CookieService, private fb: FormBuilder, private profileService:ProfileService) {}

  ngOnInit(): void {
    this.profile = JSON.parse(this.cookieService.get('userProfile'));
    this.profileForm = this.fb.group({
      name: [{ value: '', disabled: true }],
      email: [{ value: '', disabled: true }, [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(30),
        Validators.email,
      ],],
      mobileNumber: [{ value: '', disabled: true }],
      otp: [{ value: '', disabled: true }],
      password: [{ value: '', disabled: true }],
      newPassword: [{ value: '', disabled: true },[
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(40),
      ],],
      confirmPassword: [{ value: '', disabled: true },[
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(40),
      ]],
    },
    {
      validators: [Validation.match('newPassword', 'confirmPassword')],
    }
    )

    this.profileForm.setValue({
      email: this.profile.email,
      mobileNumber: this.profile.mobileNumber.toString().slice(2),
      name: `${this.profile.firstName} ${this.profile.lastName}`,
      password: '***************',
      otp: '',
      newPassword: '',
      confirmPassword: '',
    });

    this.profileForm.setValidators(
      Validation.match('newPassword', 'confirmPassword')
    );
    console.log(this.profile,'this.profile')
  }

  get f(): any {
    return this.profileForm.controls;
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
        this.onCancel(key);
        //this.profileForm?.get(key)?.setValue(this.profile[key]);
        this.profileForm?.get(key)?.disable();
      });
      this.onCancel(field);
      this.profileForm?.get(field)?.enable();

    if (field === ProfileControls.password) {
      this.isPasswordChange = true;
      this.profileForm?.get(ProfileControls.newPassword)?.enable();
      this.profileForm?.get(ProfileControls.confirmPassword)?.enable();
    } else {
      this.isPasswordChange = false;
      this.hideOtpSection = true;
      this.hideMobileNumberActions = false;
      this.profileForm.get(field)?.enable();
    }
  }

  onUpdate(field: string): void {
    this.alerts = [];
    if(this.profileForm.get(field)?.errors) {
      console.log(field);
          const error = {
            type: 'danger',
            msg: ``,
            timeout: 5000,
          };

          switch(field) {
            case 'email' :{
              error['msg'] ='Email is Invalid';
              this.alerts = [{...error}];
              break;
            }
            default : {

            }
             
          }
    }
   
    // API Call
   // this.profileForm.get(field)?.disable();
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
  uploadImage(data: any) {
    console.log(data,'data')
    const formData = new FormData();
    formData.append('files',data.target.files[0]);
    let id:string = JSON.parse(this.cookieService.get('userProfile'))['id'];
    this.profileService.uploadProfilePic$(formData,id).subscribe((data) =>  {
      console.log(data)
    })
  }
}
