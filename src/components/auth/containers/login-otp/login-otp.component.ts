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
//import { NgOtpInputComponent } from 'ng-otp-input';
@Component({
  selector: 'app-login-otp',
  templateUrl: './login-otp.component.html',
  styleUrls: ['./login-otp.component.scss'],
})
export class LoginOtpComponent implements OnInit, AfterViewInit {
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
  timeLeft: number = 10;
  interval: any;
  oTpheader: string;
  isOtpDisabled = false;
  newOtpFlag = false;
  otpForm: FormGroup;
  otp: any;
  submitted = false;

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.oTpheader = 'Send OTP';
    this.createForm();
  }

  ngAfterViewInit(): void {
    this.ngOtpInput.otpForm.disable();
  }

  changePreferredCountries(): void {
    this.preferredCountries = [CountryISO.India, CountryISO.Canada];
  }

  createForm() {
    this.otpForm = this.fb.group({
      phone: ['', [Validators.required, Validators.minLength(10)]],
      otp: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onOtpChange(otp: any) {
    this.otp = otp;
    this.otpForm.get('otp')?.setValue(otp);
  }

  get f(): any {
    return this.otpForm.controls;
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

  verify() {
    this.submitted = true;
    console.log(this.otpForm.valid);
    if (this.otpForm.valid) {
      this.router.navigate(['/local-dashboard']);
    }
  }
}
