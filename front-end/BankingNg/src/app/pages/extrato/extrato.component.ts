import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { ExtratoService } from '../../services/extrato.service';
import { TransferenciaService } from '../../services/transferencia.service';

@Component({
  selector: 'app-extrato',
  templateUrl: './extrato.component.html',
  styleUrls: ['./extrato.component.scss']
})

export class ExtratoComponent implements OnInit {
  dadosUsuario = {};
  dadosExtrato;

  transferencias = [];
  saldo;

  private _opened: boolean = false;

  private _toggleSidebar() {
    this._opened = !this._opened;
  }

  constructor( public servicoLogin: LoginService, public servicoExtrato: ExtratoService, private servicoTransf: TransferenciaService) { }

  ngOnInit() {
    this.servicoTransf.resetDados()
    this.servicoTransf.prev(0)

    this.dadosUsuario = this.servicoLogin.response
    this.servicoExtrato.getExtrato()
    .subscribe(
      dados=>{
        this.dadosExtrato = dados;

        console.log(this.dadosExtrato)

        this.transferencias = this.dadosExtrato.transferencias;
        this.saldo = this.dadosExtrato.saldoAtualizado
      },error=>{
        // alert(error._body)
      }
    )

  }

}
