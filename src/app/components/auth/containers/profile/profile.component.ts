import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { NgOtpInputComponent } from 'ng-otp-input';
import { CookieService } from 'ngx-cookie-service';
import {
  CountryISO,
  PhoneNumberFormat,
  SearchCountryField,
} from 'ngx-intl-tel-input';
import { NgxSpinnerService } from 'ngx-spinner';
import { CommonService } from 'src/app/shared/common-service';
import { AlertModelObj } from 'src/app/shared/models/alert.model';
import Validation from 'src/app/shared/utils/validation';
import { AuthService } from '../../auth.service';
import {
  ProfileActiveTab,
  ProfileControls,
} from '../../models/profile-controls';
import { ProfilePathMapping } from '../../models/profile-path-mappings';
import { ProfileUpdateRequest } from '../../models/profile-update';
import { EmailModel, MobileNumber } from '../../models/user-deatils';
import { ProfileService } from '../../services/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  @ViewChild(NgOtpInputComponent, { static: false })
  profile: any;
  interval: any;
  timeLeft: number;

  profileForm: FormGroup;
  ngOtpInput: NgOtpInputComponent;

  CountryISO = CountryISO;
  profileControls = ProfileControls;
  profileActiveTab = ProfileActiveTab;
  PhoneNumberFormat = PhoneNumberFormat;
  SearchCountryField = SearchCountryField;
  activeTab = ProfileActiveTab.profileSettings;

  hidePassword = true;
  hideOtpSection = true;
  isProfileSection = true;
  isPasswordChange = false;
  hideConfirmPassword = true;
  hideMobileNumberActions = false;

  preferredCountries: CountryISO[] = [CountryISO.India];
  otp: any = 'otp';

  // address

  isAddress = true;

  savedAddresses: any[] = [];
  alerts: any = [];

  //#region Private Members
  private profilePathMapping: ProfilePathMapping = {
    name: 'firstname',
    email: 'email',
    mobileNumber: 'mobilenumber',
    confirmPassword: 'password',
  };
  private loginId: string;
  updatedAddress: any;
  //#endregion

  //#region Constructors
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private spinner: NgxSpinnerService,
    private commonService: CommonService,
    private cookieService: CookieService,
    private profileService: ProfileService
  ) {}
  //#endregion

  //#region Life-cycle Hooks
  ngOnInit(): void {
   this.getAllAddress();
    this.createProfileForm();
    this.userProfileVerification();
    this.profileService.manageAddress$.subscribe((data) => {
      this.isAddress = true;
      this.getAllAddress();
    });
  }

  getAllAddress() {
    let newAddress: any =
    sessionStorage.getItem('addressObj') !== null
      ? sessionStorage.getItem('addressObj')
      : sessionStorage.setItem('addressObj', JSON.stringify([]));
  if (newAddress && JSON.parse(newAddress) !== null && newAddress !== '') {
    this.savedAddresses = JSON.parse(newAddress);
  }
  }
  //#endregion

  //#region Getter's
  get f(): any {
    return this.profileForm.controls;
  }
  //#endregion

  //#region Public Methods
  public onProfileSettingsClick(): void {
    this.isProfileSection = true;
    this.activeTab = ProfileActiveTab.profileSettings;
    this.isAddress = true;
    setTimeout(()=>{
       this.profile =  {...JSON.parse(this.cookieService.get('userProfile'))};
    });
  }

  public onManageAddressClick(): void {
    this.isProfileSection = false;
    this.activeTab = ProfileActiveTab.manageAddresses;
  }

  public onChange(field: string): void {
    let formControlKeys = Object.keys(this.profileForm.controls);

    formControlKeys
      .filter((key) => key !== field)
      .forEach((key) => {
        this.profileForm?.get(key)?.disable();
      });
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

  public onOtpChange(otp: any): void {
    this.otp = otp;
    this.profileForm?.get('otp')?.setValue(otp);
  }

  public onUpdate(field: string): void {
    this.alerts = [];
    if (this.profileForm.get(field)?.errors) {
      switch (field) {
        case ProfileControls.name:
          let alert: AlertModelObj = new AlertModelObj(
            'danger',
            `${field?.toUpperCase()} is Invalid !`
          );
          this.commonService.alertMessageSub$.next(alert);
          break;
        case ProfileControls.email: {
          let alert: AlertModelObj = new AlertModelObj(
            'danger',
            `${field} Invalid !`
          );
          this.commonService.alertMessageSub$.next(alert);
          break;
        }
      }
    } else {
      let newValue = this.profileForm.get(field)?.value;
      if (ProfileControls.email === field) {
        this.emailVerification(field, newValue);
      } else {
        this.updateUserProfileFields(field, newValue);
      }
    }
  }

  public onVerify(field: string): void {
    switch (field) {
      case ProfileControls.mobileNumber:
        let number = this.profileForm
          .get(ProfileControls.mobileNumber)
          ?.value['e164Number'].substring(1);

        let mobileNumber: MobileNumber = {
          mobileNumber: number,
        };

        this.authService.verifyMobileExist$(mobileNumber).subscribe({
          next: () => {
            let errorMessage = 'Please try a different mobile number';
            let alert: AlertModelObj = new AlertModelObj(
              'danger',
              errorMessage
            );
            this.commonService.alertMessageSub$.next(alert);
            this.interval = setInterval(() => {
              if (this.timeLeft > 0) {
                this.timeLeft--;
              } else {
                this.pauseTimer();
              }
            }, 1000);
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
                  let errorMessage = 'Otp Miss Match, Please try Again';
                  let alert: AlertModelObj = new AlertModelObj(
                    'danger',
                    errorMessage
                  );
                  this.commonService.alertMessageSub$.next(alert);
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

  public onCancel(field: string): void {
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

  public onConfirmOtp(): void {
    let otp = this.profileForm.get(ProfileControls.otp)?.value;
    let mobileNumber = this.profileForm
      .get(ProfileControls.mobileNumber)
      ?.value['e164Number'].substring(1);

    this.profileService
      .verifyOtp$({
        mobileNumber: this.profileForm
          .get(ProfileControls.mobileNumber)
          ?.value['e164Number'].substring(1),
        otp,
      })
      .subscribe({
        next: () => {
          this.profileService
            .updateProfile$(this.loginId, [
              new ProfileUpdateRequest(
                ProfileControls.mobileNumber,
                'replace',
                mobileNumber
              ),
            ])
            .subscribe({
              next: () => {
                this.userProfileVerification();
                this.hideOtpSection = true;
                this.hideMobileNumberActions = false;
                this.updateFieldsOnUpdate(ProfileControls.mobileNumber);
                let alert: AlertModelObj = new AlertModelObj(
                  'success',
                  `Mobile Number is Updated Successfully !`
                );
                this.commonService.alertMessageSub$.next(alert);
              },
              error: (e) => {
                this.ngOtpInput.setValue('');
                let alert: AlertModelObj = new AlertModelObj('danger', e.error);
                this.commonService.alertMessageSub$.next(alert);
              },
            });
        },
        error: () => {
          let errorMessage = 'Please enter a valid OTP';
          let alert: AlertModelObj = new AlertModelObj('danger', errorMessage);
          this.commonService.alertMessageSub$.next(alert);
          this.profileForm.get(ProfileControls.otp)?.patchValue('');
          this.ngOtpInput.setValue('');
        },
      });
  }

  public uploadImage(data: any): void {
    const formData = new FormData();
    let file = data.target.files[0] as File;
    if (!file) {
      return;
    }

    if (file.size / 1024 > 2048) {
      let errorMessage = 'Image size should be less than 2Mb';
      let alert: AlertModelObj = new AlertModelObj('danger', errorMessage);
      this.commonService.alertMessageSub$.next(alert);
      return;
    }

    formData.append('profileImageFile', data.target.files[0]);
    formData.append('loginID', this.loginId);
    let id: string = JSON.parse(this.cookieService.get('userProfile'))['id'];
    this.spinner.show();
    this.profileService.uploadProfilePic$(formData).subscribe({
      next: (data: any) => {
        this.cookieService.set('userProfile', JSON.stringify(data));
        setTimeout(() => {
          this.profile.userImage = data['userImage'];
        }, 10);
        this.spinner.hide();
      },
      error: (error) => {
        let errorMessage = 'Failed to upload image';
        let alert: AlertModelObj = new AlertModelObj('danger', errorMessage);
        this.commonService.alertMessageSub$.next(alert);
        this.spinner.hide();
      },
    });
  }

  public showPassword(field: string): void {
    if (field === this.profileControls.newPassword) {
      this.hidePassword = !this.hidePassword;
    } else {
      this.hideConfirmPassword = !this.hideConfirmPassword;
    }
  }
  //#endregion

  //#region Private Methods
  private createProfileForm(): void {
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
        validators: [
          Validation.match(
            ProfileControls.newPassword,
            ProfileControls.confirmPassword
          ),
        ],
      }
    );
  }

  private setProfileDetails(): void {
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

  private userProfileVerification(): void {
    if (this.cookieService.get('userToken')) {
      let id: string = JSON.parse(this.cookieService.get('userToken')).token.id;
      this.spinner.show();
      this.authService.getUserProfile$(id).subscribe({
        next: (userProfile: any) => {
          this.cookieService.set('userProfile', JSON.stringify(userProfile));
          this.setProfileDetails();
          this.spinner.hide();
        },
        error: (error) => {
          this.spinner.hide();
          let errorMessage = 'Failed to load profile details';
          let alert: AlertModelObj = new AlertModelObj('danger', errorMessage);
          this.commonService.alertMessageSub$.next(alert);
        },
      });
    }
  }

  private updateFieldsOnUpdate(field: string): void {
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

  private pauseTimer(): void {
    clearInterval(this.interval);
    setTimeout(() => {
      if (this.timeLeft === 0) {
        // this.isOtpDisabled = false;
        // this.newOtpFlag = true;
      }
    }, 1);
  }

  private updateUserProfileFields(field: string, newValue: string): void {
    this.spinner.show();
    this.profileService
      .updateProfile$(this.loginId, [
        new ProfileUpdateRequest(
          this.profilePathMapping[field as keyof ProfilePathMapping],
          'replace',
          newValue
        ),
      ])
      .subscribe({
        next: (resp) => {
          this.userProfileVerification();
          this.updateFieldsOnUpdate(field);
          let alert: AlertModelObj = new AlertModelObj(
            'success',
            `${field.toUpperCase()} Updated Successfully !`
          );
          this.commonService.alertMessageSub$.next(alert);
        },
        error: (error) => {
          this.spinner.hide();
          let alert: AlertModelObj = new AlertModelObj('danger', error.error);
          this.commonService.alertMessageSub$.next(alert);
        },
      });
  }

  private emailVerification(field: string, newValue: string): void {
    this.spinner.show();
    let email: EmailModel = this.profileForm.get(field)?.value;
    this.authService.verifyEmailExist$({ email: email }).subscribe({
      next: (resp) => {
        this.updateUserProfileFields(field, newValue);
        this.spinner.hide();
      },
      error: (error) => {
        let alert: AlertModelObj = new AlertModelObj(
          'danger',
          `${error.error};`
        );
        this.commonService.alertMessageSub$.next(alert);
        this.spinner.hide();
      },
    });
  }
  //#endregion

  // saveNewAddress
  saveNewAddress() {
    this.isAddress = false;
  }

  editAddress(address:any) {
    this.isAddress = false;
    this.updatedAddress = address;
  }
}
