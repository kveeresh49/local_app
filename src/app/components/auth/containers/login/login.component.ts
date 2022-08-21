import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  form: FormGroup;
  submitted = false;
  alerts: any[];
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService,
    private cookieService: CookieService
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
          Validators.minLength(6),
          Validators.maxLength(20),
        ],
      ],
      mobileNumber: '1111111111',
      otp: '111111',
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

  login() {
    this.submitted = true;
    this.setCreateFormValidators();
    if (this.loginForm.valid) {
      this.authService.userLogin$(this.loginForm.value).subscribe({
        next: (userToken: any) => {
          this.cookieService.set(
            'userToken',
            JSON.stringify(userToken['token'])
          );
          this.authService.loginUserDetailSub$.next(userToken);
          console.log(userToken.token.id,'userToken.token.id')
          this.authService.getLoginUserDetails$(userToken.token.id).subscribe(() => {
            console.log(userToken);
          })
          this.router.navigate(['dashboard']);
        },
        error: (e) => {
          this.alerts = [];
          let error: any = {
            type: 'danger',
            msg: `${e.error}`,
            timeout: 5000,
          };
          this.alerts.push(error);
          this.clearCreateFormValidators();
          console.error(e);
          this.submitted = false;
        },
      });
    }
  }

  requestOTP() {
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
}
