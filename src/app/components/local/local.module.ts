import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocalRoutingModule } from './local-routing.module';
import { FooterComponent } from './nav/footer/footer.component';
import { HomeComponent } from './home/home.component';
import { OffersShopCategoriesComponent } from './offers-shop-categories/offers-shop-categories.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PopularStoresComponent } from './popular-stores/popular-stores.component';
import { StoreDetailsComponent } from './store-details/store-details.component';
import { StoreNavbarComponent } from './store-navbar/store-navbar.component';
import { DeliverAddressComponent } from './deliver-address/deliver-address.component';
import { SideNavComponent } from './nav/side-nav/side-nav.component';
import { TopMenuNavBarComponent } from './nav/top-menu-nav-bar/top-menu-nav-bar.component';
import { TopSearchNavBarComponent } from './nav/top-search-nav-bar/top-search-nav-bar.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { DashBoardComponent } from './dash-board/dash-board/dash-board.component';
import { ShopByCategoriesComponent } from './dash-board/shop-by-categories/shop-by-categories.component';

@NgModule({
  declarations: [
    FooterComponent,
    HomeComponent,
    OffersShopCategoriesComponent,
    PopularStoresComponent,
    StoreDetailsComponent,
    StoreNavbarComponent,
    DeliverAddressComponent,
    SideNavComponent,
    TopMenuNavBarComponent,
    TopSearchNavBarComponent,
    DashBoardComponent,
    ShopByCategoriesComponent,
  ],
  imports: [LocalRoutingModule, NgbModule, CommonModule, SharedModule],
})
export class LocalModule {}
