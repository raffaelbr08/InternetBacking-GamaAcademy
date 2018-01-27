import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { TransfComponent } from './pages/transferencia/transf.component';
import { ExtratoComponent } from './pages/extrato/extrato.component';

const routes: Routes = [

  {
    path:'', component:LoginComponent
  },
  {
    path: 'extrato',  component: ExtratoComponent
  },
  {
    path: 'transferencia', component: TransfComponent
  } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
