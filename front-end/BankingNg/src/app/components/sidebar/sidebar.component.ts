import { ExtratoService } from './../../services/extrato.service';
import { LoginService } from './../../services/login.service';
import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})

export class SidebarComponent implements OnInit {

  private _opened = true;
  private window_size = window.innerWidth;
  private _mode = 'over';

  dadosUsuario = {};
  dadosExtrato;

  saldo;

  private _toggleSidebar() {
    this._opened = !this._opened;
  }

  constructor(public servicoLogin: LoginService, public servicoExtrato: ExtratoService) {
    this.dadosUsuario = this.servicoLogin.response;
    this.servicoExtrato.getExtrato()
    .subscribe(
      dados => {
        this.dadosExtrato = dados;
        this.saldo = this.dadosExtrato.saldoAtualizado;
      }
    );
  }

  ngOnInit() {
    if (this.window_size > 800) {
      this._mode = 'push';
    } else {
      this._mode = 'over';
      this._opened = false;
    }
   }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    if (event.target.innerWidth > 800) {
      this._mode = 'push';
      this._opened = true;
    } else {
      this._mode = 'over';
      this._opened = false;
    }
  }

}
