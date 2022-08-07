import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForgotpasswordComponent } from './containers/forgotpassword/forgotpassword.component';
import { LocalHomeComponent } from './containers/local-home/local-home.component';
import { LoginOtpComponent } from './containers/login-otp/login-otp.component';
import { LoginComponent } from './containers/login/login.component';
import { SigninComponent } from './containers/signin/signin.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signIn', component: SigninComponent },
  { path: 'otp', component: LoginOtpComponent },
  { path: 'forgotpassword', component: ForgotpasswordComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
