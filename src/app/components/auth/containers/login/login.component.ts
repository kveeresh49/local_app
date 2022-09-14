import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';
import { CookieService } from 'ngx-cookie-service';
import { AlertModel, EmailLoginModel } from '../../models/user-deatils';
import { NgxSpinnerService } from 'ngx-spinner';
import { CommonService } from 'src/app/shared/common-service';
import { AlertModelObj } from 'src/app/shared/models/alert.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  form: FormGroup;
  submitted = false;
  id: any;

  //Alert Model
  error: AlertModel = {
    type: '',
    msg: `Login Successful! `,
    timeout: 5000,
  };
  hidePassword = true;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService,
    private cookieService: CookieService,
    private spinner: NgxSpinnerService,
    private commonService: CommonService
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.loginForm = this.fb.group({
      email: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(30),
          Validators.email,
        ],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(32),
        ],
      ],
    });
  }

  get f(): any {
    return this.loginForm.controls;
  }

  navigateToAccount(): void {
    this.router.navigate(['/create-account']);
  }
  navigateForgetPassword(): void {
    this.router.navigate(['/forgotpassword']);
  }

  login(): void {
    this.submitted = true;
    this.setCreateFormValidators();
    if (this.loginForm.valid) {
      let emailModel: EmailLoginModel = {
        email: this.loginForm.get('email')?.value,
        password: this.loginForm.get('password')?.value,
      };
      this.spinner.show();
      this.authService.emailLogin$(emailModel).subscribe({
        next: (userToken: any) => {
          this.cookieService.set('userToken', JSON.stringify(userToken));
          this.id = userToken['id'];
          this.authService.loginUserDetailSub$.next(userToken);
          this.userProfileVerification();
          this.spinner.hide();
        },
        error: (e) => {
          let errorMessage = e.error;
          console.log(errorMessage, 'errorMessage');
          let alert: AlertModelObj = new AlertModelObj('danger', errorMessage);
          this.commonService.alertMessageSub$.next(alert);
          this.spinner.hide();
          this.clearCreateFormValidators();
          console.error(e);
          this.submitted = false;
        },
      });
    }
  }

  userProfileVerification(): void {
    let id: string = JSON.parse(this.cookieService.get('userToken')).token.id;
    this.authService.getUserProfile$(id).subscribe({
      next: (userProfile: any) => {
        this.cookieService.set('userProfile', JSON.stringify(userProfile));
        this.authService.isUserProfileSub$.next(userProfile);
        this.router.navigate(['dashboard']);
        let alert: AlertModelObj = new AlertModelObj(
          'success',
          `Login Successful!`
        );
        this.commonService.alertMessageSub$.next(alert);
      },

      error: (e) => {
        this.router.navigate(['login']);
        let alert: AlertModelObj = new AlertModelObj('danger', e.error);
        this.commonService.alertMessageSub$.next(alert);
      },
    });
  }

  requestOTP(): void {
    this.router.navigate(['/otp']);
  }

  clearCreateFormValidators(): void {
    this.loginForm.get('password')?.reset('');
    this.loginForm.get('password')?.clearValidators();
    this.loginForm.get('password')?.updateValueAndValidity();
  }

  setCreateFormValidators(): void {
    this.loginForm
      .get('password')
      ?.setValidators([
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(40),
      ]);
    this.loginForm.get('password')?.updateValueAndValidity();
    this.loginForm.updateValueAndValidity();
  }

  showPassword(): void {
    this.hidePassword = !this.hidePassword;
  }
}
