import { Component, OnInit } from '@angular/core';
import { TransferenciaService } from '../../../services/transferencia.service';
import { LoginService } from '../../../services/login.service';

@Component({
  selector: 'app-confirmacao',
  templateUrl: './confirmacao.component.html',
  styleUrls: ['./confirmacao.component.scss']
})
export class ConfirmacaoComponent implements OnInit {

  dadosUsuario = {}

  constructor(private servicoLogin: LoginService, private servicoTransf: TransferenciaService) { }

  ngOnInit() {
    this.dadosUsuario = this.servicoLogin.response.correntista;
  }
  
  enviaDados() {
    console.log(this.servicoTransf.dadosTransf)

    let envio = this.servicoTransf.postTransf()
    envio.subscribe(dados => {

      let dadoss = dados.json()

      if (!!dadoss.success) {
        console.log("sucesso", dadoss.success)
        this.servicoTransf.next(20)
        this.servicoTransf.resetDados()
      }
      else{
        this.servicoTransf.mensagemErro = dadoss.message
        console.log("falha", dadoss.message)
        this.servicoTransf.resetDados()
        this.servicoTransf.next(21)

      }


    }, error => {

      this.servicoTransf.resetDados()
      this.servicoTransf.next(21)
      let erro = error.json()
      this.servicoTransf.mensagemErro = erro.message
      console.log(error, erro.message)

    })
  }
}
