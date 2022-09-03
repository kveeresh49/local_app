import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocalRoutingModule } from './local-routing.module';
import { FooterComponent } from './nav/footer/footer.component';
import { OffersShopCategoriesComponent } from './offers-shop-categories/offers-shop-categories.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { StoreDetailsComponent } from './store-details/store-details.component';
import { StoreNavbarComponent } from './store-navbar/store-navbar.component';
import { DeliverAddressComponent } from './deliver-address/deliver-address.component';
import { SideNavComponent } from './nav/side-nav/side-nav.component';
import { TopMenuNavBarComponent } from './nav/top-menu-nav-bar/top-menu-nav-bar.component';
import { TopSearchNavBarComponent } from './nav/top-search-nav-bar/top-search-nav-bar.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { DashBoardComponent } from './dash-board/dash-board/dash-board.component';
import { StoreByCategoriesComponent } from './dash-board/store-by-categories/store-by-categories.component';
import { CategoriesTypeComponent } from './dash-board/categorie-type/categories-type.component';
import { TodayHighlightsComponent } from './dash-board/today-highlights/today-highlights.component';
import { CarouselBannerComponent } from './dash-board/carousel-banner/carousel-banner.component';

@NgModule({
  declarations: [
    FooterComponent,
    OffersShopCategoriesComponent,
    StoreDetailsComponent,
    StoreNavbarComponent,
    DeliverAddressComponent,
    SideNavComponent,
    TopMenuNavBarComponent,
    TopSearchNavBarComponent,
    DashBoardComponent,
    StoreByCategoriesComponent,
    CategoriesTypeComponent,
    TodayHighlightsComponent,
    CarouselBannerComponent,
  ],
  imports: [LocalRoutingModule, NgbModule, CommonModule, SharedModule],
  exports: [TopMenuNavBarComponent, TopSearchNavBarComponent],
})
export class LocalModule {}
