import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { CreateAccountComponent } from './containers/create-account/create-account.component';
import { ForgotpasswordComponent } from './containers/forgotpassword/forgotpassword.component';
import { LoginOtpComponent } from './containers/login-otp/login-otp.component';
import { LoginComponent } from './containers/login/login.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'create-account',
    component: CreateAccountComponent,
    canActivate: [AuthGuard],
  },
  { path: 'otp', component: LoginOtpComponent, canActivate: [AuthGuard] },
  {
    path: 'forgotpassword',
    component: ForgotpasswordComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
