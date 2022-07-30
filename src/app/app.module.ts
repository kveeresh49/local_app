import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AuthModule } from 'src/auth/auth.module';
import { LocalModule } from 'src/local/local.module'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    LocalModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
