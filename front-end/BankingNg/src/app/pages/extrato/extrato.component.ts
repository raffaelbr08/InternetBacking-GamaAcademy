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

  constructor( public servicoLogin: LoginService, public servicoExtrato: ExtratoService, private servicoTransf: TransferenciaService) {
    this.dadosExtrato = this.servicoExtrato.extrato

    this.servicoTransf.resetDados()
    // this.servicoTransf.prev(0)

    this.dadosUsuario = this.servicoLogin.response
    this.servicoExtrato.getExtrato()
    .subscribe(
      dados=>{
        this.servicoExtrato.extrato = dados;

        this.transferencias = this.servicoExtrato.extrato.transferencias
        this.saldo = this.servicoExtrato.extrato.saldoAtualizado
      },error=>{
        console.log(error)
      }
    )
   }

  ngOnInit() {
    

  }

}
