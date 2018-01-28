import { Component, OnInit, Input } from '@angular/core';
import { TransferenciaService } from '../../../services/transferencia.service';
import { LoginService } from '../../../services/login.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-outra-conta',
  templateUrl: './outra-conta.component.html',
  styleUrls: ['./outra-conta.component.scss']
})
export class OutraContaComponent implements OnInit {
  dadosUsuario = {}

  constructor(private servicoLogin: LoginService, private servicoTransf: TransferenciaService) {
  }

  ngOnInit() {
  }

  next($event: UIEvent, formulario, number) {
    $event.preventDefault()

    console.log(formulario)

    if (!!formulario.valid) {
      this.servicoTransf.dadosTransf.origem = this.servicoLogin.response.correntista.contaCorrente
      this.servicoTransf.next()
    } else {
      formulario.form.controls.agencia.touched = true
      formulario.form.controls.destino.touched = true
      formulario.form.controls.nome.touched = true
      formulario.form.controls.valor.touched = true
      
      console.log(formulario)
    }
  }

  prev($event: UIEvent, formulario, number) {
    $event.preventDefault()
    if(this.servicoTransf.isFavorecido){
      this.servicoTransf.prev(1)
    }else{
      this.servicoTransf.prev(0)
    }
  }


}
