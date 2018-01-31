import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { ExtratoService } from '../../services/extrato.service';
import { TransferenciaService } from '../../services/transferencia.service';
import * as pubSub from 'pubsub-js'

@Component({
  selector: 'app-extrato',
  templateUrl: './extrato.component.html',
  styleUrls: ['./extrato.component.scss']
})

export class ExtratoComponent implements OnInit {
  dadosUsuario = {};
  transferencias = []
  dadosExtrato;

  constructor( public servicoLogin: LoginService, public servicoExtrato: ExtratoService, private servicoTransf: TransferenciaService) {
    this.dadosUsuario = this.servicoLogin.response
    
    pubSub.subscribe('NOVO_EXTRATO', (msg, dados) =>{
      this.transferencias = dados
    })

   }

  ngOnInit() {

    this.servicoExtrato.getExtrato()
    .subscribe(
      dados=>{
        this.transferencias = dados.transferencias;
        this.servicoExtrato.extrato.saldoAtualizado = dados.saldoAtualizado
      },error=>{
        
        console.log(error)
      }
    )

  }

}
