import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocalHomeComponent } from './containers/local-home/local-home.component';
import { LoginComponent } from './containers/login/login.component';
import { SignOutComponent } from './containers/sign-out/sign-out.component';
import { LoginImgComponent } from './containers/login-img/login-img.component';
import { LoginOtpComponent } from './containers/login-otp/login-otp.component';
import { ForgotpasswordComponent } from './containers/forgotpassword/forgotpassword.component';
import { SharedModule } from 'src/shared/shared.module';
import { AuthRoutingModule } from './auth-routing.module';
import { CreateAccountComponent } from './containers/create-account/create-account.component';

@NgModule({
  declarations: [
    LocalHomeComponent,
    LoginComponent,
    SignOutComponent,
    LoginImgComponent,
    LoginOtpComponent,
    ForgotpasswordComponent,
    CreateAccountComponent,
  ],
  imports: [SharedModule, AuthRoutingModule],
  exports: [
    LocalHomeComponent,
    SharedModule,
    LoginComponent,
    SignOutComponent,
    LoginImgComponent,
    LoginOtpComponent,
    ForgotpasswordComponent,
  ],
})
export class AuthModule {}
