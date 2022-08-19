import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LandinglogoComponent } from './components/landinglogo/landinglogo.component';
import { StoreCardComponent } from './components/store-card/store-card.component';
import { NgOtpInputModule } from 'ng-otp-input';
import { MatStepperModule } from '@angular/material/stepper';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CategoryCardComponent } from './components/category-card/category-card.component';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatDividerModule} from '@angular/material/divider'
@NgModule({
  declarations: [
    StoreCardComponent,
    LandinglogoComponent,
    CategoryCardComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    FontAwesomeModule,
    NgOtpInputModule,
    NgxIntlTelInputModule,
    SlickCarouselModule,
  ],
  exports: [
    CommonModule,
    StoreCardComponent,
    FontAwesomeModule,
    LandinglogoComponent,
    NgOtpInputModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    NgxIntlTelInputModule,
    MatSidenavModule,
    MatDividerModule

  ],
})
export class SharedModule {}
