import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LocalRoutingModule } from './local-routing.module';
import { LocalNavbarComponent } from './local-navbar/local-navbar.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { OffersShopCategoriesComponent } from './offers-shop-categories/offers-shop-categories.component';

import  {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { PopularStoresComponent } from './popular-stores/popular-stores.component'
import { SharedModule } from 'src/shared-module/shared/shared.module';

@NgModule({
  declarations: [
    LocalNavbarComponent,
    FooterComponent,
    HomeComponent,
    DashboardComponent,
    OffersShopCategoriesComponent,
    PopularStoresComponent
  ],
  imports: [
    CommonModule,
    LocalRoutingModule,
    NgbModule,
    SharedModule
  ]
})
export class LocalModule { }
