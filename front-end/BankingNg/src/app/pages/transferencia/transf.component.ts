import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { TransferenciaService } from '../../services/transferencia.service';
import { ModalComponent } from '../../components/modal/modal.component'


@Component({
  selector: 'app-transf',
  templateUrl: './transf.component.html',
  styleUrls: ['./transf.component.scss']
})
export class TransfComponent implements OnInit {
  dadosTransf = {}
  dadosUsuario = {
    contaCorrente: ''
  };
  contaInvalida: Boolean
  dadosDestino
  formularioValido = true

  showModal = false
  ShowAlert = false
  alertErro = false


  constructor(private servicoLogin: LoginService, private servicoTransf: TransferenciaService) { }

  ngOnInit() {
     this.dadosUsuario = this.servicoLogin.response.correntista;

  }

  realizaTrasnf(formulario: NgForm): void{
    console.log(formulario.value)
    this.dadosTransf = formulario.value;
    this.servicoTransf.dadosTransf = formulario.value;
    this.servicoTransf.dadosTransf.origem = this.servicoLogin.response.correntista.contaCorrente;

    formulario.reset();

    this.servicoTransf.postTransf()
    .subscribe(
      dados=>{
        alert(dados)
       
        this.showModal = false
        this.ShowAlert = true

      }, error=>{
        console.log("erro")
        this.showModal = false
        this.alertErro = true
      }
    )
  }

  validaForm(formulario: NgForm){
    if(formulario.valid && !!this.dadosDestino)
    {
      this.formularioValido = true
      this.showModal = true
    }else {
      this.showModal = false
      this.formularioValido = false
    }
  }

  validaConta($event){
    console.log($event.target.value)
    if($event.target.value == this.dadosUsuario.contaCorrente ){
      this.contaInvalida = true
    }else{

      this.servicoTransf.getCorrentista($event.target.value)
      .subscribe(
        correntista =>{


          this.dadosDestino = correntista.json().correntista
          this.contaInvalida = false


        }, error =>{
          this.dadosDestino = {}
          this.contaInvalida = true

        }
      )
    }

  }
}
