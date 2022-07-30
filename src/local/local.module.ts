import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LocalRoutingModule } from './local-routing.module';
import { LocalNavbarComponent } from './local-navbar/local-navbar.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';


@NgModule({
  declarations: [
    LocalNavbarComponent,
    FooterComponent,
    HomeComponent,
    DashboardComponent
  ],
  imports: [
    CommonModule,
    LocalRoutingModule
  ]
})
export class LocalModule { }
