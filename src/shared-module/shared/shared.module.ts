import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthModule } from 'src/auth/auth.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    AuthModule
  ],
  exports: [
    ReactiveFormsModule,
    FormsModule,
    AuthModule

  ],
})
export class SharedModule {}
