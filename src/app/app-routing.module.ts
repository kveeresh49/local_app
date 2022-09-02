import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DeliverAddressComponent } from './components/local/deliver-address/deliver-address.component';
import { StoreDetailsComponent } from './components/local/store-details/store-details.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./components/auth/auth.module').then((m) => m.AuthModule),
  },

  { path: 'dash-address', component: DeliverAddressComponent },
  {
    path: 'store',
    component: StoreDetailsComponent,
    children: [{ path: ':id', component: StoreDetailsComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
