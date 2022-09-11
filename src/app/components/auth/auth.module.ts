import { TopMenuNavBarComponent } from './../local/nav/top-menu-nav-bar/top-menu-nav-bar.component';
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
import { ProfileComponent } from './containers/profile/profile.component';
import { LocalModule } from '../local/local.module';
import {MatIconModule} from '@angular/material/icon';
@NgModule({
  declarations: [
    LoginComponent,
    SignOutComponent,
    LoginImgComponent,
    LoginOtpComponent,
    ForgotpasswordComponent,
    CreateAccountComponent,
    ProfileComponent,
  ],
  imports: [SharedModule, AuthRoutingModule, LocalModule,MatIconModule],
  exports: [
    CommonModule,
    SharedModule,
    LoginComponent,
    SignOutComponent,
    LoginImgComponent,
    LoginOtpComponent,
    ForgotpasswordComponent,
    AuthRoutingModule
  ],
})
export class AuthModule {}
