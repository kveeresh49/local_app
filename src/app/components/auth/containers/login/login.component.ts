import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserDetails } from '../../models/user-deatils';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  form: FormGroup;
  submitted = false;
  user: UserDetails;
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.loginForm = this.fb.group({
      userName: [
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
    if (this.loginForm.valid) {
      this.authService.userLogin$(this.loginForm.value).subscribe({
        next: (userToken) => {
          console.log(userToken, 'accountDetails');
          sessionStorage.setItem('token', 'myToken');
          this.router.navigate(['/local-dashboard']);
        },
        error: (e) => {
          console.error(e);
        },
      });
      // this.router.navigate(['/store']);
    }
  }
  requestOTP() {
    this.router.navigate(['/otp']);
  }
}
