import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ForgotpasswordComponent } from 'src/components/auth/containers/forgotpassword/forgotpassword.component';
import { LocalHomeComponent } from 'src/components/auth/containers/local-home/local-home.component';
import { LoginOtpComponent } from 'src/components/auth/containers/login-otp/login-otp.component';
import { LoginComponent } from 'src/components/auth/containers/login/login.component';
import { SigninComponent } from 'src/components/auth/containers/signin/signin.component';

const routes: Routes = [
  { path: '', component: LocalHomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signIn', component: SigninComponent },
  { path: 'otp', component: LoginOtpComponent },
  { path: 'forgotpassword', component: ForgotpasswordComponent },
  { path: 'local-home', component: LocalHomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
