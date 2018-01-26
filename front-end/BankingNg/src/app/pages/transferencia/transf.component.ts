import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { TransferenciaService } from '../../services/transferencia.service';


@Component({
  selector: 'app-transf',
  templateUrl: './transf.component.html',
  styleUrls: ['./transf.component.scss']
})
export class TransfComponent implements OnInit {
  dadosTransf = {}
  dadosUsuario = {};
  contaInvalida: Boolean
  dadosDestino

  constructor(private servicoLogin: LoginService, private servicoTransf: TransferenciaService) { }

  ngOnInit() {
     this.dadosUsuario = this.servicoLogin.response.correntista;

  }

  realizaTrasnf(formulario: NgForm): void{
    console.log(formulario)
    this.dadosTransf = formulario.value;
    this.servicoTransf.dadosTransf = formulario.value;
    this.servicoTransf.dadosTransf.origem = this.servicoLogin.response.correntista.contaCorrente;
    this.servicoTransf.postTransf()
    .subscribe(
      dados=>{
        // $('#sucesso').modal('show')
       

      }, error=>{

      }
    )
  }

  validaForm(){
    
  }

  validaConta($event){
    console.log($event.target.value)
    this.servicoTransf.getCorrentista($event.target.value)
    .subscribe(
      correntista =>{
        
        this.dadosDestino = correntista.json().correntista
        this.contaInvalida = false

        console.log(this.dadosDestino)
      }, error =>{
        console.log(error.json())

        
        this.contaInvalida = true

      }
    )
  }
}