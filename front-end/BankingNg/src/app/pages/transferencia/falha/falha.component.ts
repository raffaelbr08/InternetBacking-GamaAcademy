import { Component, OnInit } from '@angular/core';
import { TransferenciaService } from '../../../services/transferencia.service';
import { LoginService } from '../../../services/login.service';

@Component({
  selector: 'app-falha-transferencia',
  templateUrl: './falha.component.html',
  styleUrls: ['./falha.component.scss']
})
export class FalhaComponent implements OnInit {

  constructor(private servicoLogin: LoginService, private servicoTransf: TransferenciaService) { }

  ngOnInit() {
    if(!this.servicoTransf.dadosTransf.destino){
    }
  }

  ngOnDestroy(){
    this.servicoTransf.resetDados()
  }

}
