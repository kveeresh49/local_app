import { NgModule } from '@angular/core';
import { LocalRoutingModule } from './local-routing.module';
import { FooterComponent } from './nav/footer/footer.component';
import { HomeComponent } from './home/home.component';
import { OffersShopCategoriesComponent } from './offers-shop-categories/offers-shop-categories.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PopularStoresComponent } from './popular-stores/popular-stores.component';
import { StoreDetailsComponent } from './store-details/store-details.component';
import { SharedModule } from 'src/shared/shared.module';
import { DeliverAddressComponent } from './deliver-address/deliver-address.component';
import { SideNavComponent } from './nav/side-nav/side-nav.component';
import { TopMenuNavBarComponent } from './nav/top-menu-nav-bar/top-menu-nav-bar.component';
import { TopSearchNavBarComponent } from './nav/top-search-nav-bar/top-search-nav-bar.component';

@NgModule({
  declarations: [
    FooterComponent,
    HomeComponent,
    OffersShopCategoriesComponent,
    PopularStoresComponent,
    StoreDetailsComponent,
    DeliverAddressComponent,
    SideNavComponent,
    TopMenuNavBarComponent,
    TopSearchNavBarComponent,
  ],
  imports: [LocalRoutingModule, NgbModule, SharedModule],
})
export class LocalModule {}
