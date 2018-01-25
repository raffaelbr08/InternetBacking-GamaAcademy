import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { ExtratoComponent } from './pages/extrato/extrato.component';
import { HeaderComponent } from './components/header/header.component';


const routes: Routes = [

  {
    path:'', component:LoginComponent
  },
  {
    path: 'extrato', component: ExtratoComponent
  },
  {
    path: 'header', component: HeaderComponent
  }

 

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
