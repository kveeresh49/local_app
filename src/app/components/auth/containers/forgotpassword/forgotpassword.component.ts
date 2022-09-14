import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgOtpInputComponent } from 'ng-otp-input';
import {
  SearchCountryField,
  CountryISO,
  PhoneNumberFormat,
} from 'ngx-intl-tel-input';
import { CommonService } from 'src/app/shared/common-service';
import { AlertModelObj } from 'src/app/shared/models/alert.model';
import Validation from 'src/app/shared/utils/validation';

import { AuthService } from '../../auth.service';
import { AccountDetails } from '../../models/account-details';
import { OtpLoginModel, PasswordResetModel } from '../../models/user-deatils';

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
  otpHeader: string;
  timeLeft: number;
  isOtpDisabled: boolean;
  interval: any;
  forgotPasswordForm: FormGroup;
  submitted = false;
  otp: any;
  alerts: any[];

  hidePassword = true;
  confirmPasswordShow = true;
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService,
    private commonService: CommonService
  ) {}

  ngOnInit(): void {
    this.otpHeader = 'Send OTP';
    this.createForm();
  }

  ngAfterViewInit(): void {
    this.ngOtpInput.otpForm.disable();
  }

  createForm() {
    this.forgotPasswordForm = this.fb.group(
      {
        mobileNumber: ['', [Validators.required, Validators.minLength(10)]],
        otp: ['', [Validators.required, Validators.minLength(6)]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            Validators.maxLength(40),
          ],
        ],
        confirmPassword: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(40),
          ],
        ],
        email: '',
      },

      {
        validators: [Validation.match('password', 'confirmPassword')],
      }
    );
  }

  onOtpChange(otp: any) {
    this.otp = otp;
    this.forgotPasswordForm.get('otp')?.setValue(otp);
  }

  get f(): any {
    return this.forgotPasswordForm.controls;
  }

  sendOTP(): void {
    this.ngOtpInput.otpForm.enable();

    let mobileNumber = {
      mobileNumber: this.forgotPasswordForm
        .get('mobileNumber')
        ?.value['e164Number'].substring(1),
    };

    this.authService.verifyMobileExist$(mobileNumber).subscribe({
      next: (mobileNumber: any) => {
        this.authService
          .sendOtp(
            this.forgotPasswordForm
              .get('mobileNumber')
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
        let alert: AlertModelObj = new AlertModelObj('danger', e.error);
        this.commonService.alertMessageSub$.next(alert);
        console.log(e);
      },
    });
  }

  clearCreateFormValidators(): void {
    this.forgotPasswordForm.get('confirmPassword')?.reset('');
    this.forgotPasswordForm.get('password')?.reset();
    this.forgotPasswordForm.clearValidators();
    this.forgotPasswordForm.get('password')?.clearValidators();
    this.forgotPasswordForm.get('confirmPassword')?.clearValidators();
    this.forgotPasswordForm.get('confirmPassword')?.updateValueAndValidity();
    this.forgotPasswordForm.get('password')?.updateValueAndValidity();
  }

  setCreateFormValidators(): void {
    this.forgotPasswordForm
      .get('password')
      ?.setValidators([
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(40),
      ]);
    this.forgotPasswordForm
      .get('confirmPassword')
      ?.setValidators([
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(40),
      ]);
    this.forgotPasswordForm.setValidators(
      Validation.match('password', 'confirmPassword')
    );
    this.forgotPasswordForm.get('password')?.updateValueAndValidity();
    this.forgotPasswordForm.get('confirmPassword')?.updateValueAndValidity();
    this.forgotPasswordForm.updateValueAndValidity();
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

  navigateToAccount(): void {
    this.router.navigate(['/create-account']);
  }

  reSetPassword():void {
    this.submitted = true;
    this.setCreateFormValidators();
    if (this.forgotPasswordForm.valid) {
      let passwordRestObj: PasswordResetModel = {
        mobileNumber: +this.forgotPasswordForm
          .get('mobileNumber')
          ?.value['e164Number'].substring(1),
        password: this.forgotPasswordForm.get('password')?.value,
        otp: +this.forgotPasswordForm.get('otp')?.value,
      };
      this.authService.resetPassword$(passwordRestObj).subscribe({
        next: (accountDetails: any) => {
          this.router.navigate(['/login']);
          let alert: AlertModelObj = new AlertModelObj(
            'success',
            'Password Changed Successfully!'
          );
          this.commonService.alertMessageSub$.next(alert);
        },
        error: (e) => {
          this.alerts = [];
          console.error(e);
          this.ngOtpInput.setValue('');
          this.clearCreateFormValidators();
          let alert: AlertModelObj = new AlertModelObj('danger', e.error);
          this.commonService.alertMessageSub$.next(alert);
        },
      });
    }
  }

  showPassword() :void{
    this.hidePassword = !this.hidePassword;
  }
  confirmPasswordShow$():void {
    this.confirmPasswordShow = !this.confirmPasswordShow;
  }
}
