import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';
import { CookieService } from 'ngx-cookie-service';
import { EmailLoginModel } from '../../models/user-deatils';
import { NgxSpinnerService } from 'ngx-spinner';

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
  id: any;
  // passwordicons:any;
hide: boolean = true;
  icon: any;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService,
    private cookieService: CookieService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.createForm();
  }
  // myFunction() {
  //   this.hide = !this.hide;
  //   if( ('#password').attr("type") == "text"){
  //               ('#password').attr('type', 'password');
  //               ('#password i').addClass( "fa-eye-slash" );
  //               ('#show_hide_password i').removeClass( "fa-eye" );
  //           }else if(('#show_hide_password input').attr("type") == "password"){
  //               // ('#show_hide_password input').attr('type', 'text');
  //               ('#show_hide_password i').removeClass( "fa-eye-slash" );
  //               ('#show_hide_password i').addClass( "fa-eye" );
  //           }
  // }

  myFunction(){
    this.hide = !this.hide;
    this.icon = document.getElementById("eyeicon");
    if (this.icon.className = "fa-eye-slash"){
      this.icon.className = "fa-eye-slash"
    }else {
      this.icon.className = "fa-eye"
      // this.icon.removeClass("fa-eye-slash");
      // this.icon.addClass("fa-eye")
    }

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
      let emailModel:EmailLoginModel = {
        "email": this.loginForm.get('email')?.value,
         "password": this.loginForm.get('password')?.value,
      }
      this.spinner.show();
      this.authService.emailLogin$(emailModel).subscribe({
        next: (userToken: any) => {
          this.cookieService.set('userToken', JSON.stringify(userToken['token']));
          this.id = userToken['id'];
          this.authService.loginUserDetailSub$.next(userToken);
          this.userProfileVerification();
          this.spinner.hide();
        },
        error: (e) => {
          this.alerts = [];
          let error: any = {
            type: 'danger',
            msg: `${e.error}`,
            timeout: 5000,
          };
          this.spinner.hide();
          this.alerts.push(error);
          this.clearCreateFormValidators();
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
        this.router.navigate(['login']);
      },
    });
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

// $(document).ready(function() {
//   $("#show_hide_password a").on('click', function(event) {
//       event.preventDefault();
//       if($('#show_hide_password input').attr("type") == "text"){
//           $('#show_hide_password input').attr('type', 'password');
//           $('#show_hide_password i').addClass( "fa-eye-slash" );
//           $('#show_hide_password i').removeClass( "fa-eye" );
//       }else if($('#show_hide_password input').attr("type") == "password"){
//           $('#show_hide_password input').attr('type', 'text');
//           $('#show_hide_password i').removeClass( "fa-eye-slash" );
//           $('#show_hide_password i').addClass( "fa-eye" );
//       }
//   });
// });


// let passwordicons = document.querySelector(".eyeicon")

// passwordicons?.addEventListener('click', function(event){
//   event.preventDefault();
//   if('.show_hide_password  input').attr("type") == ("text"){
//     ('.show_hide_password  input').attr('type', 'password');
//   }
// })



