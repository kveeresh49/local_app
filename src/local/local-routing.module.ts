import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
// import { LocalNavbarComponent } from './local-navbar/local-navbar.component';

const routes: Routes = [
  {path:'local-dashboard' , component:HomeComponent},
  {path:'profile', component:DashboardComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LocalRoutingModule { }
