import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AuthModule } from 'src/components/auth/auth.module';
import { StoreCardComponent } from './components/store-card/store-card.component';

@NgModule({
  declarations: [StoreCardComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    AuthModule,
    FontAwesomeModule,
  ],
  exports: [
    ReactiveFormsModule,
    FormsModule,
    AuthModule,
    StoreCardComponent,
    FontAwesomeModule,
  ],
})
export class SharedModule {}
