import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

import { LoginComponent } from './pages/login/login.component';
import { TransfComponent } from './pages/transferencia/transf.component';
import { ExtratoComponent } from './pages/extrato/extrato.component';
import { Page404Component } from './pages/page404/page404.component';

const routes: Routes = [

  {
    path: '', component: LoginComponent
  },
  {
    path: 'extrato', component: ExtratoComponent, canActivate: [AuthGuard]
  },
  {
    path: 'transferencia', component: TransfComponent, canActivate: [AuthGuard]
  },

  {path:'**', component: Page404Component}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
