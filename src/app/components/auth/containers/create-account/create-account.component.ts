import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import {
  SearchCountryField,
  CountryISO,
  PhoneNumberFormat,
} from 'ngx-intl-tel-input';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Validation from 'src/shared/utils/validation';
import { NgOtpInputComponent } from 'ng-otp-input';
@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss'],
})
export class CreateAccountComponent implements OnInit {
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
  signInForm: FormGroup;
  submitted = false;
  otp: any;
  otp1: any;
  verifyOtpForm: FormGroup;
  isLoggedIn = true;
  verifyOtpFormSubmiit =false;
  loggedOut = false;

  constructor(private router: Router, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.oTpheader = 'Send OTP';
    this.createForm();
  }

  createForm(): void {
    this.signInForm = this.fb.group(
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
    return this.signInForm.controls;
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
    this.submitted = true;
    if(this.signInForm.valid){
      this.isLoggedIn = !this.isLoggedIn;
      this.loggedOut = !this.loggedOut;
      setTimeout(() => {
        this.verifyOtpForm
          .get('phone')
          ?.setValue(this.signInForm.get('phone')?.value);
        this.ngOtpInput.otpForm.disable();
        this.verifyOtpForm.get('phone')?.disable();
        this.sendOTP();
      }, 10);
    }
  
  }

  createAccount():void {
    this.verifyOtpFormSubmiit = true;
    console.log(this.verifyOtpForm.valid,'this.verifyOtpForm')
    if(this.verifyOtpForm.valid) {
      this.router.navigate(['/local-dashboard'])
    }
  }
}

