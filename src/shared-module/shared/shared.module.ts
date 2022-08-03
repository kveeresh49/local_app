import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthModule } from 'src/auth/auth.module';
import { StoreCardComponent } from 'src/shared/components/store-card/store-card.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


@NgModule({
  declarations: [StoreCardComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    AuthModule,
    FontAwesomeModule 
  ],
  exports: [
    ReactiveFormsModule,
    FormsModule,
    AuthModule,
    StoreCardComponent,
    FontAwesomeModule

  ],
})
export class SharedModule {}
