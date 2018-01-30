import { Component, OnInit } from '@angular/core';
import { TransferenciaService } from '../../../services/transferencia.service';
import { LoginService } from '../../../services/login.service';
import { Router } from '@angular/router'


@Component({
  selector: 'app-confirmacao',
  templateUrl: './confirmacao.component.html',
  styleUrls: ['./confirmacao.component.scss']
})
export class ConfirmacaoComponent implements OnInit {

  dadosUsuario = {}

  constructor(private servicoLogin: LoginService, private servicoTransf: TransferenciaService, private router: Router) { }

  ngOnInit() {
    this.dadosUsuario = this.servicoLogin.response.correntista;
  }
  
  enviaDados() {

    let envio = this.servicoTransf.postTransf()
    envio.subscribe(dados => {

      let dadoss = dados

      if (!!dadoss.success) {
        console.log("sucesso", dadoss.success)
        this.servicoTransf.resetDados()
        this.router.navigate(['/transferencia/sucesso'])
        
      }
      else{
        this.servicoTransf.mensagemErro = dadoss.message
        console.log("falha", dadoss.message)
        this.servicoTransf.resetDados()
        this.router.navigate(['/transferencia/falha'])

      }

    }, error => {

      this.servicoTransf.resetDados()
      // this.servicoTransf.next(21)
      let erro = error
      this.servicoTransf.mensagemErro = erro.message
      console.log(error, erro.message)

    })
  }
}
