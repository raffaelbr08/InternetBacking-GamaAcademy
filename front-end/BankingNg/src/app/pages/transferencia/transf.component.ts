import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router'

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

  favorecidos = []

  formularioValido = true

  mensagemDeErro = ''

  pagina = ''


  constructor(private servicoLogin: LoginService, private servicoTransf: TransferenciaService, private modalService: NgbModal, route:ActivatedRoute ) { 
    route.params.subscribe(
      (parametro) => {
        this.servicoTransf.paginaAnterior = this.pagina
        this.pagina = parametro.pagina

        console.log('pagina anterior:', this.servicoTransf.paginaAnterior, 'pagina nova:', this.pagina)
        if(!parametro.pagina){
          
          this.servicoTransf.resetDados()
        }
      }
    )
  }

  ngOnInit() {
    console.log('init transferencia')
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

}
