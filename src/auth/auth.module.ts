import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SigninComponent } from './containers/signin/signin.component';
import { LocalHomeComponent } from './containers/local-home/local-home.component';
import { LoginComponent } from './containers/login/login.component';
import { SignOutComponent } from './containers/sign-out/sign-out.component';
import { LandinglogoComponent } from './containers/landinglogo/landinglogo.component';
import { LoginImgComponent } from './containers/login-img/login-img.component';
import { LoginOtpComponent } from './containers/login-otp/login-otp.component';
import { ForgotpasswordComponent } from './containers/forgotpassword/forgotpassword.component';

@NgModule({
  declarations: [
    LocalHomeComponent,
    LoginComponent,
    SignOutComponent,
    SigninComponent,
    LandinglogoComponent,
    LoginImgComponent,
    LoginOtpComponent,
    ForgotpasswordComponent,
  ],
  imports: [CommonModule],
})
export class AuthModule {}
