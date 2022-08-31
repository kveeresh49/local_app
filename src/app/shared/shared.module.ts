import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LandinglogoComponent } from './components/landinglogo/landinglogo.component';
import { StoreCardComponentCopy } from './components/store-card-copy/store-card-copy.component';
import { NgOtpInputModule } from 'ng-otp-input';
import { MatStepperModule } from '@angular/material/stepper';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { AlertModule } from 'ngx-bootstrap/alert';
import { AlertComponent } from './components/alert/alert.component';
import { CategoryCardComponent } from './components/category-card/category-card.component';
import { StoreCardComponent } from './components/store-card/store-card.component';
import { HighlightCardComponent } from './components/highlight-card/highlight-card.component';
import { OfferTagComponent } from './components/offer-tag/offer-tag.component';
@NgModule({
  declarations: [
    StoreCardComponentCopy,
    LandinglogoComponent,
    AlertComponent,
    CategoryCardComponent,
    StoreCardComponent,
    HighlightCardComponent,
    OfferTagComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    FontAwesomeModule,
    NgOtpInputModule,
    NgxIntlTelInputModule,
    SlickCarouselModule,
    AlertModule.forRoot()
  ],
  exports: [
    CommonModule,
    StoreCardComponentCopy,
    FontAwesomeModule,
    LandinglogoComponent,
    NgOtpInputModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    NgxIntlTelInputModule,
    AlertModule,
    AlertComponent,
    CategoryCardComponent,
    StoreCardComponent,
    HighlightCardComponent,
    OfferTagComponent
  ],
})
export class SharedModule {}
