import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateAccountComponent } from './containers/create-account/create-account.component';
import { ForgotpasswordComponent } from './containers/forgotpassword/forgotpassword.component';
import { LoginOtpComponent } from './containers/login-otp/login-otp.component';
import { LoginComponent } from './containers/login/login.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'create-account', component: CreateAccountComponent },
  { path: 'otp', component: LoginOtpComponent },
  { path: 'forgotpassword', component: ForgotpasswordComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
