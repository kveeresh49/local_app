import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LocalHomeComponent } from 'src/components/auth/containers/local-home/local-home.component';
import { StoreDetailsComponent } from 'src/components/local/store-details/store-details.component';
import { CategoryCardComponent } from 'src/shared/components/category-card/category-card.component';
// import { CategoryCardComponent } from 'src/shared/components/category-card/category-card.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./../components/auth/auth.module').then((m) => m.AuthModule),
  },

  { path: 'local-home', component: LocalHomeComponent },
  {
    path: 'store',
    component: StoreDetailsComponent,
    children: [{ path: ':id', component: StoreDetailsComponent }],
  },
  {
    path: 'shops-by-categoires',
    component: CategoryCardComponent,
    children: [{ path: ':id', component: CategoryCardComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
