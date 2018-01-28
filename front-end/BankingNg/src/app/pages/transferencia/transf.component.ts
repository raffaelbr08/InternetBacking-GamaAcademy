import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { TransferenciaService } from '../../services/transferencia.service';
import { ModalComponent } from '../../components/modal/modal.component'
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';




@Component({
  selector: 'app-transf',
  templateUrl: './transf.component.html',
  styleUrls: ['./transf.component.scss']
})
export class TransfComponent implements OnInit {
  dadosTransf = {}

  modalref: NgbModalRef

  dadosUsuario = {
    contaCorrente: ''
  };

  fase

  transferencia = {
    nomeFavorecido: "",
    agenciaFavorecido: "",
    salvarFavorecido: false,
    valor: "",
    destino: "",
    origem: ""
  }

  favorecidos = [
    {agencia: "1", destino: "123", nome: "everton"},
    {agencia: "2", destino: "3123", nome: "Fabiano"},
    {agencia: "33", destino: "23123", nome: "Felipe"}
  ]

  formularioValido = true

  mensagemDeErro = ''


  constructor(private servicoLogin: LoginService, private servicoTransf: TransferenciaService, private modalService: NgbModal ) { 
    
  }

  ngOnInit() {
     this.dadosUsuario = this.servicoLogin.response.correntista;
  }


  openModal(content, $event, canNotBeOpend){
    $event.preventDefault()

    if(!canNotBeOpend){
      this.modalref = this.modalService.open(content)

      this.modalref.result.then((result) => {
        console.log(result)
      }, (reason) => {
        console.log(reason)
      });
    }
    
  }

  closeModal(){
    this.fase = 1
    this.modalref.close()
  }



  realizaTrasnf(formulario: NgForm): void{
    this.servicoTransf.dadosTransf = this.transferencia

    this.servicoTransf.postTransf()
    .subscribe(
      dados=>{

        this.fase++

        this.transferencia = {
          nomeFavorecido: "",
          agenciaFavorecido: "",
          salvarFavorecido: false,
          valor: "",
          destino: "",
          origem: ""
        }
      }, error=>{

        this.fase = 9
        error = error.json()
        this.mensagemDeErro = error.message
        console.log(error)
      }
    )
  }

  validaForm(formulario: NgForm){
    if(formulario.valid )
    {
      this.formularioValido = true
    }else {
      this.formularioValido = false
    }
  }

}
