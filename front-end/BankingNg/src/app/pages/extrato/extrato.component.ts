import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { ExtratoService } from '../../services/extrato.service';

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

  constructor( public servicoLogin: LoginService, public servicoExtrato: ExtratoService) { }

  ngOnInit() {
    this.dadosUsuario = this.servicoLogin.response
    this.servicoExtrato.getExtrato()
    .subscribe(
      dados=>{
        this.dadosExtrato = dados.json();

        console.log(this.dadosExtrato)

        this.transferencias = this.dadosExtrato.transferencias; 
        this.saldo = this.dadosExtrato.saldoAtualizado 
      },error=>{
        alert(error._body)
      }
    )
    
  }

}