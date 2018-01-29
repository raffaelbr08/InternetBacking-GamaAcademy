import { Component, OnInit, Input } from '@angular/core';
import { TransferenciaService } from '../../../services/transferencia.service';
import { LoginService } from '../../../services/login.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router'

@Component({
  selector: 'app-outra-conta',
  templateUrl: './outra-conta.component.html',
  styleUrls: ['./outra-conta.component.scss']
})
export class OutraContaComponent implements OnInit {
  dadosUsuario = {}

  formulario: FormGroup

  constructor(private servicoLogin: LoginService, private servicoTransf: TransferenciaService, private formBuilder: FormBuilder, private router: Router) {

    this.formulario = formBuilder.group({
      agenciaFavorecido: ['', Validators.required],
      destino: ['', [Validators.required]],
      nomeFavorecido: ['', [Validators.required]],
      salvarFavorecido: ['', [Validators.required]],
      valor: ['', [Validators.required]]
    })
  }

  ngOnInit() {
  }

  next() {

    if (!!this.formulario.valid) {
      this.servicoTransf.dadosTransf.origem = this.servicoLogin.response.correntista.contaCorrente
      this.router.navigate(['/transferencia/token'])
    } else {
      this.formulario.controls.agenciaFavorecido.markAsTouched()
      this.formulario.controls.destino.markAsTouched()
      this.formulario.controls.nomeFavorecido.markAsTouched()
      this.formulario.controls.valor.markAsTouched()
    }
  }

  prev() {

    if(this.servicoTransf.isFavorecido){
      this.router.navigate(['/transferencia', 'favorecidos'])
    }else{
      this.router.navigate(['/transferencia'])
    }
    
  }


}
