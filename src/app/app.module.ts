import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthModule } from './components/auth/auth.module';
import { LocalModule } from './components/local/local.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { JwtInterceptor } from './shared/helpers/jwt-interceptor';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { AgmCoreModule } from '@agm/core';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AuthModule,
    LocalModule,
    BsDropdownModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBF0ojaCL0D4P3Na8c17Hs15JM6CEvE9Jc'
    }),
    //NgxSpinnerModule
    GooglePlaceModule,
  ],
  providers: [
  
    CookieService,{ provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    ],
  bootstrap: [AppComponent],
})
export class AppModule {}
