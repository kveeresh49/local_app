import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForgotpasswordComponent } from 'src/auth/containers/forgotpassword/forgotpassword.component';
import { LocalHomeComponent } from 'src/auth/containers/local-home/local-home.component';
import { LoginOtpComponent } from 'src/auth/containers/login-otp/login-otp.component';
import { LoginComponent } from 'src/auth/containers/login/login.component';
import { SigninComponent } from 'src/auth/containers/signin/signin.component';

const routes: Routes = [
  {path:'' , component:LocalHomeComponent},
  {path:'login', component:LoginComponent},
  {path:'signIn', component:SigninComponent},
  {path:'otp', component:LoginOtpComponent},
  {path:'forgotpassword', component:ForgotpasswordComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
