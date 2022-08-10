import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  form: FormGroup;
  submitted = false;
  constructor(private router: Router, private fb: FormBuilder) {}

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
          Validators.email
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
      this.router.navigate(['/store']);
    }
  }
  requestOTP() {
    this.router.navigate(['/otp']);
  }
}
