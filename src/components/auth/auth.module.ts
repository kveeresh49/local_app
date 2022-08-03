import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SigninComponent } from './containers/signin/signin.component';
import { LocalHomeComponent } from './containers/local-home/local-home.component';
import { LoginComponent } from './containers/login/login.component';
import { SignOutComponent } from './containers/sign-out/sign-out.component';
import { LoginImgComponent } from './containers/login-img/login-img.component';
import { LoginOtpComponent } from './containers/login-otp/login-otp.component';
import { ForgotpasswordComponent } from './containers/forgotpassword/forgotpassword.component';
import { SharedModule } from 'src/shared/shared.module';

@NgModule({
  declarations: [
    LocalHomeComponent,
    LoginComponent,
    SignOutComponent,
    SigninComponent,
    LoginImgComponent,
    LoginOtpComponent,
    ForgotpasswordComponent,
  ],
  imports: [SharedModule],
  exports: [
    LocalHomeComponent,
    SharedModule,
    LoginComponent,
    SignOutComponent,
    SigninComponent,
    LoginImgComponent,
    LoginOtpComponent,
    ForgotpasswordComponent,
  ],
})
export class AuthModule {}
