import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LocalHomeComponent } from 'src/auth/containers/local-home/local-home.component';
import { LoginComponent } from 'src/auth/containers/login/login.component';

const routes: Routes = [
  {path:'' , component:LocalHomeComponent},
  {path:'login', component:LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
