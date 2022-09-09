import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashBoardComponent } from './dash-board/dash-board/dash-board.component';
import { DeliverAddressComponent } from './deliver-address/deliver-address.component';
import { OffersShopCategoriesComponent } from './offers-shop-categories/offers-shop-categories.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashBoardComponent,
    data: {isAuthComonent: false}   
  },
  { path: 'offers', component: OffersShopCategoriesComponent },
  { path: 'deliver-address', component: DeliverAddressComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LocalRoutingModule {}
