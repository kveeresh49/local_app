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

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService
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
    this.authService.sentOtp("919390815134").subscribe((data) => {
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
      this.createAccountForm.get('mobileNumber')?.value.number,
      this.verifyOtpForm.get('otp')?.value,
      this.createAccountForm.get('password')?.value
    );
  }

  createAccount(): void {
    this.verifyOtpFormSubmit = true;
    if (this.verifyOtpForm.valid) {
      this.createAccountFormObj();
      this.authService.createUserAccount$(this.accountDetails).subscribe({
        next: (accountDetails) => {
          this.router.navigate(['dashboard']);
          this.authService.isloggedInUser.next(true);
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
  }

  onClosed(dismissedAlert: AlertComponent): void {
    this.alerts = this.alerts.filter((alert) => alert !== dismissedAlert);
  }
}
