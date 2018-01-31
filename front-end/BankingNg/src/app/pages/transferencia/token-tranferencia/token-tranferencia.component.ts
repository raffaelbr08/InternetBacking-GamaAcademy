import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../../services/login.service';
import { TransferenciaService } from '../../../services/transferencia.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-token-tranferencia',
  templateUrl: './token-tranferencia.component.html',
  styleUrls: ['./token-tranferencia.component.scss']
})
export class TokenTranferenciaComponent implements OnInit {

  formulario: FormGroup

  msg = {
    conteudo: '',
    class: ''
  }

  tokenEnviado: boolean
  loading = true

  constructor(private servicoLogin: LoginService, private servicoTransf: TransferenciaService, private router: Router, private formBuilder: FormBuilder) {

    this.formulario = formBuilder.group({
      token: ['', Validators.required],
    })

  }

  ngOnInit() {

    if (!this.servicoTransf.dadosTransf.destino || !this.servicoTransf.dadosTransf.valor) {
      this.router.navigate(['/transferencia'])
    }
    else {
      this.geraToken()
    }



  }
  geraToken(called = false) {
    
    this.servicoTransf.geraToken(this.servicoLogin.response.correntista.contaCorrente)
      .subscribe(res => {

        if (res.success) {
          console.log(res)
          this.tokenEnviado = true
          if (called) {
            this.msg = {
              conteudo: 'Token re-enviado para seu email!',
              class: 'alert-success'
            }
          }
        }
        else {
          this.msg = {
            conteudo: 'Não foi possivel enviar o token! Tente novamente mais tarde.',
            class: 'alert-warning'
          }
        }
        this.loading = false 

      }, err => {
        this.tokenEnviado = false
        console.log(err)
        this.msg = {
          conteudo: 'Não foi possivel enviar o token! Tente novamente mais tarde.',
          class: 'alert-warning'
        }
        this.loading = false
      })
  }

  verificaToken() {

    console.log(this.formulario.controls.token.value)
    this.servicoTransf.verificaToken(this.servicoLogin.response.correntista.contaCorrente, this.formulario.controls.token.value)
    .subscribe(res =>{
      if(res.success){
        this.router.navigate(['/transferencia/confirmacao'])
      }
      else{
        this.msg = {
          conteudo: 'Token invalido!',
          class: 'alert-danger'
        }
      }
    }, err =>{
      console.log(err)
      this.msg = {
        conteudo: 'Token invalido!',
        class: 'alert-danger'
      }
    })


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
      else {
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
