import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SigninComponent } from './containers/signin/signin.component';
import { LocalHomeComponent } from './containers/local-home/local-home.component';
import { LoginComponent } from './containers/login/login.component';
import { SignOutComponent } from './containers/sign-out/sign-out.component';

@NgModule({
  declarations: [
    LocalHomeComponent,
    LoginComponent,
    SignOutComponent,
    SigninComponent,
  ],
  imports: [CommonModule],
})
export class AuthModule {}
