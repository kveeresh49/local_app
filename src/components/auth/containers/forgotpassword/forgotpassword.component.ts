import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgOtpInputComponent } from 'ng-otp-input';
import {
  SearchCountryField,
  CountryISO,
  PhoneNumberFormat,
} from 'ngx-intl-tel-input';
import Validation from 'src/shared/utils/validation';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.scss'],
})
export class ForgotpasswordComponent implements OnInit, AfterViewInit {
  @ViewChild('phoneField') phoneField: any;
  @ViewChild(NgOtpInputComponent, { static: false })
  ngOtpInput: NgOtpInputComponent;
  separateDialCode = false;
  SearchCountryField = SearchCountryField;
  CountryISO = CountryISO;
  PhoneNumberFormat = PhoneNumberFormat;
  preferredCountries: CountryISO[] = [
    CountryISO.UnitedStates,
    CountryISO.UnitedKingdom,
  ];
  newOtpFlag: boolean;
  oTpheader: string;
  timeLeft: number;
  isOtpDisabled: boolean;
  interval: any;
  forgotPassword: FormGroup;
  submitted = false;
  otp: any;
  constructor(private router: Router, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.oTpheader = 'Send OTP';
    this.createForm();
  }

  ngAfterViewInit(): void {
    this.ngOtpInput.otpForm.disable();
  }

  createForm() {
    this.forgotPassword = this.fb.group(
      {
        phone: ['', [Validators.required, Validators.minLength(10)]],
        otp: ['', [Validators.required, Validators.minLength(6)]],
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
  }

  onOtpChange(otp: any) {
    this.otp = otp;
    this.forgotPassword.get('otp')?.setValue(otp);
  }

  get f(): any {
    return this.forgotPassword.controls;
  }

  sendOTP(): void {
    this.ngOtpInput.otpForm.enable();
    this.newOtpFlag = false;
    this.oTpheader = 'Resend OTP';
    this.timeLeft = 30;
    this.isOtpDisabled = true;
    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        this.pauseTimer();
      }
    }, 1000);
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

  navigateToLoging() {
    this.router.navigate(['/login']);
  }

  navigateToAccount(): void {
    this.router.navigate(['/create-account']);
  }

  login() {
    this.submitted = true;
    if (this.forgotPassword.valid) {
      this.router.navigate(['/login']);
    }
  }
}
