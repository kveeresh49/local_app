import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LandinglogoComponent } from './components/landinglogo/landinglogo.component';
import { StoreCardComponent } from './components/store-card/store-card.component';

@NgModule({
  declarations: [StoreCardComponent, LandinglogoComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    FontAwesomeModule,
  ],
  exports: [StoreCardComponent, LandinglogoComponent],
})
export class SharedModule {}
