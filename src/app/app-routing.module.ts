import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewComponentComponent } from './components/local/dash-board/new-component/new-component.component';
import { DeliverAddressComponent } from './components/local/deliver-address/deliver-address.component';
import { StoreDetailsComponent } from './components/local/store-details/store-details.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./components/auth/auth.module').then((m) => m.AuthModule),
      data: {isAuthComonent: true}  
  },

  { path: 'dash-address', component: DeliverAddressComponent },
  { path: 'new-address', component: NewComponentComponent },
  {
    path: 'store',
    component: StoreDetailsComponent,
    children: [{ path: ':id', component: StoreDetailsComponent }],
    data: {isAuthComonent: true}  
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
