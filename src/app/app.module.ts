import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AuthModule } from 'src/auth/auth.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoaclNavbarComponent } from './local/loacl-navbar/loacl-navbar.component';
import { FooterComponent } from './local/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    LoaclNavbarComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
