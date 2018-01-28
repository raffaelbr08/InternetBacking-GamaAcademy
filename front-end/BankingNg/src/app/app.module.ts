import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';


import { AppRoutingModule } from './app-routing.module';

import { AuthGuard } from './guards/auth.guard';

import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { LogoComponent } from './components/logo/logo.component';
import { ExtratoComponent } from './pages/extrato/extrato.component';
import { HttpModule } from '@angular/http';
import { LoginService } from './services/login.service';
import { TransfComponent } from './pages/transferencia/transf.component';
import { ExtratoService } from './services/extrato.service';

import { TextMaskModule } from 'angular2-text-mask';
import { TransferenciaService } from './services/transferencia.service';
import { ModalComponent } from './components/modal/modal.component';
import { SidebarModule } from 'ng-sidebar';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    LogoComponent,
    ExtratoComponent,
    TransfComponent,
    ModalComponent,
    SidebarComponent
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpModule,
    TextMaskModule,
    NgbModule.forRoot(),
    SidebarModule.forRoot()
  ],
  providers: [LoginService, ExtratoService, TransferenciaService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
