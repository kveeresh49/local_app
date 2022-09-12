import { Component, OnInit, ViewChild } from '@angular/core';
import {
  SearchCountryField,
  CountryISO,
  PhoneNumberFormat,
} from 'ngx-intl-tel-input';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { NgOtpInputComponent } from 'ng-otp-input';
import { UserAccount } from '../../models/user-account';
import { AuthService } from '../../auth.service';
import { AlertComponent } from 'ngx-bootstrap/alert/alert.component';
import Validation from 'src/app/shared/utils/validation';
import { CookieService } from 'ngx-cookie-service';
import { EmailLoginModel, EmailPhoneModel } from '../../models/user-deatils';
@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss'],
})
export class CreateAccountComponent implements OnInit {
  @ViewChild('phoneField') phoneField: any;
  @ViewChild(NgOtpInputComponent, { static: false })
  ngOtpInput: NgOtpInputComponent;
  createAccountForm: FormGroup;
  SearchCountryField = SearchCountryField;
  CountryISO = CountryISO;
  PhoneNumberFormat = PhoneNumberFormat;
  preferredCountries: CountryISO[] = [
    CountryISO.UnitedStates,
    CountryISO.UnitedKingdom,
  ];
  timeLeft: number;
  interval: any;
  otpHeader: string;
  isOtpDisabled = false;
  newOtpFlag = false;
  isSubmitClick = false;
  otp: any;
  verifyOtpForm: FormGroup;
  isLoggedIn = true;
  verifyOtpFormSubmit = false;
  loggedOut = false;
  accountDetails: UserAccount;
  alerts: any[] = [];
  id: any;

  hidePassword = true;
  hideconfirmPassword = true;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService,
    private cookieService: CookieService
  ) {}

  ngOnInit(): void {
    this.otpHeader = 'Send OTP';
    this.createForm();
  }

  createForm(): void {
    this.createAccountForm = this.fb.group(
      {
        name: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(20),
          ],
        ],
        phone: ['', [Validators.required, Validators.minLength(10)]],
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(40),
          ],
        ],
        confirmPassword: ['', Validators.required],
      },
      {
        validators: [Validation.match('password', 'confirmPassword')],
      }
    );
    this.verifyOtpForm = this.fb.group({
      phone: ['', [Validators.required, Validators.minLength(10)]],
      otp: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  get f(): any {
    return this.createAccountForm.controls;
  }

  get verifyOtp(): any {
    return this.verifyOtpForm.controls;
  }

  onOtpChange(otp: any) {
    this.otp = otp;
    this.verifyOtpForm.get('otp')?.setValue(otp);
  }

  changePreferredCountries(): void {
    this.preferredCountries = [CountryISO.India, CountryISO.Canada];
  }

  sendOTP(): void {
    let emailPhoneModel: EmailPhoneModel = {
      email: this.createAccountForm.get('email')?.value,
      mobileNumber: this.createAccountForm
        .get('phone')
        ?.value['e164Number'].substring(1),
    };

    this.authService.verifyEmailOrMobileExist$(emailPhoneModel).subscribe({
      next: (accountDetails) => {
        this.authService
          .sendOtp(
            this.createAccountForm
              .get('phone')
              ?.value['e164Number'].substring(1)
          )
          .subscribe((data) => {
            this.ngOtpInput.otpForm.enable();
            this.newOtpFlag = false;
            this.otpHeader = 'Resend OTP';
            this.timeLeft = 30;
            this.isOtpDisabled = true;
            this.interval = setInterval(() => {
              if (this.timeLeft > 0) {
                this.timeLeft--;
              } else {
                this.pauseTimer();
              }
            }, 1000);
          });
      },
      error: (e) => {
        this.alerts = [];
        let error = {
          type: 'danger',
          msg: `${e.error}`,
          timeout: 5000,
        };
        this.isLoggedIn = true;
        this.verifyOtpFormSubmit = false;
        this.clearCreateFormValidators();
        this.alerts = [error];
        console.error(e);
      },
    });
  }

  changeMobileNumber() {
    this.verifyOtpForm.get('phone')?.enable();
  }

  pauseTimer(): void {
    clearInterval(this.interval);
    setTimeout(() => {
      if (this.timeLeft === 0) {
        this.isOtpDisabled = false;
        this.newOtpFlag = true;
      }
    }, 1);
  }

  clickToContinue(): void {
    this.isSubmitClick = true;
    this.setCreateFormValidators();
    if (this.createAccountForm.valid) {
      this.isLoggedIn = !this.isLoggedIn;
      this.loggedOut = !this.loggedOut;
      setTimeout(() => {
        this.verifyOtpForm
          .get('phone')
          ?.setValue(this.createAccountForm.get('phone')?.value);
        this.ngOtpInput.otpForm.disable();
        this.verifyOtpForm.get('phone')?.disable();
        this.sendOTP();
      }, 10);
    }
  }

  setCreateFormValidators(): void {
    this.createAccountForm
      .get('password')
      ?.setValidators([
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(40),
      ]);
    this.createAccountForm
      .get('confirmPassword')
      ?.setValidators([
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(40),
      ]);
    this.createAccountForm.setValidators(
      Validation.match('password', 'confirmPassword')
    );
    this.createAccountForm.get('password')?.updateValueAndValidity();
    this.createAccountForm.get('confirmPassword')?.updateValueAndValidity();
    this.createAccountForm.updateValueAndValidity();
  }

  clearCreateFormValidators(): void {
    this.createAccountForm.get('confirmPassword')?.reset('');
    this.createAccountForm.get('password')?.reset();
    this.createAccountForm.clearValidators();
    this.createAccountForm.get('password')?.clearValidators();
    this.createAccountForm.get('confirmPassword')?.clearValidators();
    this.createAccountForm.get('confirmPassword')?.updateValueAndValidity();
    this.createAccountForm.get('password')?.updateValueAndValidity();
  }

  createAccountFormObj() {
    this.accountDetails = new UserAccount(
      this.createAccountForm.get('name')?.value,
      this.createAccountForm.get('email')?.value,
      this.createAccountForm.get('phone')?.value['e164Number'].substring(1),
      this.verifyOtpForm.get('otp')?.value,
      this.createAccountForm.get('password')?.value
    );
  }

  createAccount(): void {
    this.verifyOtpFormSubmit = true;
    if (this.verifyOtpForm.valid) {
      this.createAccountFormObj();

      this.authService.createUserAccount$(this.accountDetails).subscribe({
        next: (userToken: any) => {
          this.cookieService.set('userToken', JSON.stringify(userToken));
          this.id = userToken['id'];
          this.authService.loginUserDetailSub$.next(userToken);
          this.userProfileVerification();
        },
        error: (e) => {
          this.alerts = [];
          let error = {
            type: 'danger',
            msg: `${e.error}`,
            timeout: 5000,
          };
          this.isLoggedIn = false;
          this.verifyOtpFormSubmit = false;
          this.ngOtpInput.setValue('');
         // this.clearCreateFormValidators();
          this.alerts = [error];
          console.error(e);
        },
      });
    }
  }

  showPassword() {
    this.hidePassword = !this.hidePassword;
  }

  showConfirmPassword() {
    this.hideconfirmPassword = !this.hideconfirmPassword;
  }
  // emailLoginVerification() {
  //   let emailLogin: EmailLoginModel = {
  //     email: this.createAccountForm.get('email')?.value,
  //     password: this.createAccountForm.get('password')?.value,
  //   };
  //   this.authService.emailLogin$(emailLogin).subscribe({
  //     next: (userToken: any) => {
  //       this.cookieService.set('userToken', JSON.stringify(userToken['token']));
  //       this.id = userToken['id'];
  //       this.authService.loginUserDetailSub$.next(userToken);
  //       this.userProfileVerification();
  //     },
  //     error: (e) => {
  //       this.alerts = [];
  //       let error = {
  //         type: 'danger',
  //         msg: `${e.error}`,
  //         timeout: 5000,
  //       };
  //       this.router.navigate(['login']);
  //     },
  //   });
  // }

  navigateLogin(): void {
    this.router.navigate(['/login']);
  }

  userProfileVerification() {
    let id: string = JSON.parse(this.cookieService.get('userToken'))['id'];
    this.authService.userProfile$(id).subscribe({
      next: (userProfile: any) => {
        this.cookieService.set('userProfile', JSON.stringify(userProfile));
        this.authService.isUserProfileSub$.next(userProfile);
        this.router.navigate(['dashboard']);
      },
      error: (e) => {
        this.alerts = [];
        let error = {
          type: 'danger',
          msg: `${e.error}`,
          timeout: 5000,
        };
        this.router.navigate(['login']);
      },
    });
  }

  onClosed(dismissedAlert: AlertComponent): void {
    this.alerts = this.alerts.filter((alert) => alert !== dismissedAlert);
  }
}
