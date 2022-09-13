import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { NgxSpinnerService } from 'ngx-spinner';
import Validation from 'src/app/shared/utils/validation';
import { AuthService } from '../../auth.service';
import {
  ProfileActiveTab,
  ProfileControls,
} from '../../models/profile-controls';
import { ProfileUpdateRequest } from '../../models/profile-update';
import { MobileNumber } from '../../models/user-deatils';
import { ProfileService } from '../../services/profile.service';

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
  alerts: any = [];
  private loginId: string;

  profilePathMapping: any = {
    name: 'firstname',
    email: 'email',
    mobileNumber: 'mobilenumber',
    confirmPassword: 'password',
  };
  hidePassword = true;
  hideConfirmPassword = true;

  constructor(
    private cookieService: CookieService,
    private fb: FormBuilder,
    private profileService: ProfileService,
    private authService: AuthService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.profileForm = this.fb.group(
      {
        name: [
          { value: '', disabled: true },
          [Validators.required, Validators.minLength(6)],
        ],
        email: [
          { value: '', disabled: true },
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(30),
            Validators.email,
          ],
        ],
        mobileNumber: [
          { value: '', disabled: true },
          [Validators.minLength(10), Validators.maxLength(10)],
        ],
        otp: [{ value: '', disabled: true }],
        password: [{ value: '', disabled: true }],
        newPassword: [
          { value: '', disabled: true },
          [
            Validators.required,
            Validators.minLength(8),
            Validators.maxLength(40),
          ],
        ],
        confirmPassword: [
          { value: '', disabled: true },
          [
            Validators.required,
            Validators.minLength(8),
            Validators.maxLength(40),
          ],
        ],
      },
      {
        validators: [Validation.match('newPassword', 'confirmPassword')],
      }
    );
    this.userProfileVerification();
  }

  setProfileDetails() {
    this.profile = JSON.parse(this.cookieService.get('userProfile'));
    this.loginId = this.profile.loginID;
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

  userProfileVerification() {
    let id: string = JSON.parse(this.cookieService.get('userToken')).token.id;
    this.spinner.show();
    this.authService.userProfile$(id).subscribe({
      next: (userProfile: any) => {
        this.cookieService.set('userProfile', JSON.stringify(userProfile));
        this.setProfileDetails();
        this.spinner.hide();
      },
      error: (e) => {
        this.spinner.hide();
        this.alerts = [];
        let error = {
          type: 'danger',
          msg: `${e.error}`,
          timeout: 5000,
        };
      },
    });
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
    if (this.profileForm.get(field)?.errors) {
      const error = {
        type: 'danger',
        msg: ``,
        timeout: 5000,
      };

      switch (field) {
        case ProfileControls.name:
          error['msg'] = 'Name is Invalid';
          this.alerts = [{ ...error }];
          break;
        case ProfileControls.email: {
          error['msg'] = 'Email is Invalid';
          this.alerts = [{ ...error }];
          break;
        }
      }
    } else {
      let newValue = this.profileForm.get(field)?.value;
      this.spinner.show();
      this.profileService
        .updateProfile$(this.loginId, [
          new ProfileUpdateRequest(
            this.profilePathMapping[field],
            'replace',
            newValue
          ),
        ])
        .subscribe({
          next: (resp) => {
            this.userProfileVerification();
            this.spinner.hide();
            this.updateFieldsOnUpdate(field);
          },
          error: (error) => {
            this.spinner.hide();
          },
        });
    }
  }

  updateFieldsOnUpdate(field: string) {
    switch (field) {
      case ProfileControls.confirmPassword:
        this.isPasswordChange = false;
        this.profileForm.get(ProfileControls.password)?.disable();

        let newPassword = this.profileForm.get(
          ProfileControls.confirmPassword
        )?.value;

        this.profileForm.patchValue({
          password: newPassword,
          confirmPassword: '',
          newPassword: '',
        });
        break;
      default:
        this.profileForm.get(field)?.disable();
        break;
    }
  }

  onVerify(field: string): void {
    switch (field) {
      case ProfileControls.mobileNumber:
        let number = this.profileForm.get(ProfileControls.mobileNumber)?.value;
        number = `91${number}`;

        let mobileNumber: MobileNumber = {
          mobileNumber: number,
        };

        this.authService.verifyMobileExist$(mobileNumber).subscribe({
          next: () => {
            const error = {
              type: 'danger',
              msg: ``,
              timeout: 5000,
            };
            error['msg'] = 'Please try a different mobile number';
            this.alerts = [{ ...error }];
          },
          error: (err: HttpErrorResponse) => {
            if (err.status === 404) {
              this.authService.sendOtp(number).subscribe({
                next: () => {
                  this.hideOtpSection = false;
                  this.profileForm.get(ProfileControls.otp)?.enable();
                  this.profileForm.get(ProfileControls.mobileNumber)?.disable();
                  this.hideMobileNumberActions = true;
                },
                error: () => {
                  console.log('failed - sendOtp');
                },
              });
            }
          },
        });
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
        this.profileForm.get(ProfileControls.password)?.disable();
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
    let otp = this.profileForm.get(ProfileControls.otp)?.value;
    let mobileNumber = this.profileForm.get(
      ProfileControls.mobileNumber
    )?.value;
    let mobileWithCountryCode = +`91${mobileNumber}`;

    this.profileService
      .verifyOtp$({
        mobileNumber: mobileWithCountryCode,
        otp,
      })
      .subscribe({
        next: () => {
          this.profileService
            .updateProfile$(this.loginId, [
              new ProfileUpdateRequest(
                ProfileControls.mobileNumber,
                'replace',
                mobileWithCountryCode.toString()
              ),
            ])
            .subscribe({
              next: () => {
                this.userProfileVerification();
                this.hideOtpSection = true;
                this.hideMobileNumberActions = false;
                this.updateFieldsOnUpdate(ProfileControls.mobileNumber);
              },
              error: () => {},
            });
        },
        error: () => {
          const error = {
            type: 'danger',
            msg: ``,
            timeout: 5000,
          };
          error['msg'] = 'Please enter a valid OTP';
          this.alerts = [{ ...error }];
          this.profileForm.get(ProfileControls.otp)?.patchValue('');
        },
      });
  }

  uploadImage(data: any) {
    const formData = new FormData();
    let file = data.target.files[0] as File;
    if (!file) {
      return;
    }

    if (file.size / 1024 > 500) {
      const error = {
        type: 'danger',
        msg: ``,
        timeout: 5000,
      };
      error['msg'] = 'Image size should be less than 2Mb';
      this.alerts = [{ ...error }];
      return;
    }
    formData.append('profileImageFile', data.target.files[0]);
    formData.append('loginID', this.loginId);
    let id: string = JSON.parse(this.cookieService.get('userProfile'))['id'];
    this.profileService.uploadProfilePic$(formData).subscribe((data: any) => {
      this.profile.userImage = data['userImage'];
    });
  }

  showPassword(field: string) {
    if (field === this.profileControls.newPassword) {
      this.hidePassword = !this.hidePassword;
    } else {
      this.hideConfirmPassword = !this.hideConfirmPassword;
    }
  }
}
