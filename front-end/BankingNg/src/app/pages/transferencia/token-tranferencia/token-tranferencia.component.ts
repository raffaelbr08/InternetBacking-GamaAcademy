import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../../services/login.service';
import { TransferenciaService } from '../../../services/transferencia.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-token-tranferencia',
  templateUrl: './token-tranferencia.component.html',
  styleUrls: ['./token-tranferencia.component.scss']
})
export class TokenTranferenciaComponent implements OnInit {

  constructor(private servicoLogin: LoginService, private servicoTransf: TransferenciaService, private router: Router) { }

  ngOnInit() {

    if(!this.servicoTransf.dadosTransf.destino || !this.servicoTransf.dadosTransf.valor){
      this.router.navigate(['/transferencia'])
    }



  }
  verificaToken(){
    this.router.navigate(['/transferencia/confirmacao'])
    
  }

  enviaDados() {
    console.log(this.servicoTransf.dadosTransf)
  
    let envio = this.servicoTransf.postTransf()
    envio.subscribe(dados => {

      let dadoss = dados

      if (!!dadoss.success) {
        console.log("sucesso", dadoss.success)
        this.servicoTransf.resetDados()
      }
      else{
        this.servicoTransf.mensagemErro = dadoss.message
        console.log("falha", dadoss.message)
        this.servicoTransf.resetDados()

      }

    }, error => {

      this.servicoTransf.resetDados()
      let erro = error
      this.servicoTransf.mensagemErro = erro.message
      console.log(error, erro.message)

    })
  }

}
