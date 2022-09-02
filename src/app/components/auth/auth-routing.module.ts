import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { CreateAccountComponent } from './containers/create-account/create-account.component';
import { ForgotpasswordComponent } from './containers/forgotpassword/forgotpassword.component';
import { LoginOtpComponent } from './containers/login-otp/login-otp.component';
import { LoginComponent } from './containers/login/login.component';
import { ProfileComponent } from './containers/profile/profile.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, canActivate: [AuthGuard] },
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
  {
    path: 'profile',
    component: ProfileComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
