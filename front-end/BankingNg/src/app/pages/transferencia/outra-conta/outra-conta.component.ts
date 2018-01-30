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

  mascaraValor(e,m,r,a){

    var code

    // Cancela se o evento for Backspace
    if (!e) e = window.event

    if (e.keyCode) {
      code = e.keyCode
    }else if (e.which){
      code = e.which
    } 

    var w = e.target

    // Variáveis da função
    var txt  = (!r) ? w.value.replace(/[^\d]+/gi,'') : w.value.replace(/[^\d]+/gi,'').split('').reverse().join('');
    var mask = (!r) ? m : m.split('').reverse().join('');
    var pre  = (a ) ? a.pre : "";
    var pos  = (a ) ? a.pos : "";
    var ret  = "";

    if(code == 9 || code == 8 || txt.length == mask.replace(/[^#]+/g,'').length) return false;
    
    // Loop na máscara para aplicar os caracteres
    for(var x=0,y=0, z=mask.length;x<z && y<txt.length;){
      if(mask.charAt(x)!='#'){
        ret += mask.charAt(x); x++; 
      }else{
        ret += txt.charAt(y); y++; x++; 
      } 
    }

    // Retorno da função
    ret = (!r) ? ret : ret.split('').reverse().join('') 

    var valor = pre+ret+pos

    this.servicoTransf.dadosTransf.valor = valor
    //this.servicoTransf.dadosTransf.mascara_valor = valor
    //this.servicoTransf.dadosTransf.valor = valor.replace(/[^0-9]/g, "")
    
  }


}
