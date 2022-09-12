import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgOtpInputComponent } from 'ng-otp-input';
import { CookieService } from 'ngx-cookie-service';
import {
  SearchCountryField,
  CountryISO,
  PhoneNumberFormat,
} from 'ngx-intl-tel-input';
import { AuthService } from '../../auth.service';
import { OtpLoginModel } from '../../models/user-deatils';
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
  otpHeader: string;
  isOtpDisabled = false;
  newOtpFlag = false;
  otpForm: FormGroup;
  otp: any = '';
  submitted = false;
  alerts: any[];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private cookieService: CookieService
  ) {}

  ngOnInit(): void {
    this.otpHeader = 'Send OTP';
    this.createForm();
  }

  ngAfterViewInit(): void {
    this.ngOtpInput?.otpForm?.disable();
  }

  changePreferredCountries(): void {
    this.preferredCountries = [CountryISO.India, CountryISO.Canada];
  }

  createForm() {
    this.otpForm = this.fb.group({
      mobile: ['', [Validators.required, Validators.minLength(10)]],
      otp: ['', [Validators.required, Validators.minLength(6)]],
      email: '',
      password: '',
    });
  }

  onOtpChange(otp: any) {
    this.otp = otp;
    this.otpForm?.get('otp')?.setValue(otp);
  }

  get f(): any {
    return this.otpForm.controls;
  }

  sendOTP(): void {
    this.ngOtpInput.otpForm.enable();
    let mobileNumber = {
      mobileNumber: this.otpForm
        .get('mobile')
        ?.value['e164Number'].substring(1),
    };

    this.authService.verifyMobileExist$(mobileNumber).subscribe({
      next: (mobileNumber: any) => {
        this.authService
          .sendOtp(this.otpForm.get('mobile')?.value['e164Number'].substring(1))
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
        this.alerts.push(error);
      },
    });
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
    if (this.otpForm.valid) {
      let OtpLogin: OtpLoginModel = {
        mobileNumber: +this.otpForm
          .get('mobile')
          ?.value['e164Number'].substring(1),
        otp: +this.otpForm.get('otp')?.value,
      };

      this.authService.otpLogin$(OtpLogin).subscribe({
        next: (userToken: any) => {
          this.cookieService.set('userToken', JSON.stringify(userToken));
          this.cookieService.get('userToken');
          this.authService.isloggedInUser.next(true);
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
          this.ngOtpInput.setValue('');
          this.alerts.push(error);
          console.error(e);
          this.submitted = false;
        },
      });
    }
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
      },
    });
  }

  navigateToAccount(): void {
    this.router.navigate(['/create-account']);
  }
}
