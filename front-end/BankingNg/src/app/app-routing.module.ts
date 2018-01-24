import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { ExtratoComponent } from './pages/extrato/extrato.component';

const routes: Routes = [

  {
    path:'', component:LoginComponent
  },
  {
    path: 'extrato', component: ExtratoComponent
  }
 

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
