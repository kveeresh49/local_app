import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './containers/login/login.component';
import { SignOutComponent } from './containers/sign-out/sign-out.component';
import { LoginImgComponent } from './containers/login-img/login-img.component';
import { LoginOtpComponent } from './containers/login-otp/login-otp.component';
import { ForgotpasswordComponent } from './containers/forgotpassword/forgotpassword.component';
import { AuthRoutingModule } from './auth-routing.module';
import { CreateAccountComponent } from './containers/create-account/create-account.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    LoginComponent,
    SignOutComponent,
    LoginImgComponent,
    LoginOtpComponent,
    ForgotpasswordComponent,
    CreateAccountComponent,
  ],
  imports: [SharedModule, AuthRoutingModule],
  exports: [
    CommonModule,
    SharedModule,
    LoginComponent,
    SignOutComponent,
    LoginImgComponent,
    LoginOtpComponent,
    ForgotpasswordComponent,
  ],
})
export class AuthModule {}
