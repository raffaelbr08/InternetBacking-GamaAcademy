import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../../services/login.service';
import { TransferenciaService } from '../../../services/transferencia.service';

@Component({
  selector: 'app-token-tranferencia',
  templateUrl: './token-tranferencia.component.html',
  styleUrls: ['./token-tranferencia.component.scss']
})
export class TokenTranferenciaComponent implements OnInit {

  constructor(private servicoLogin: LoginService, private servicoTransf: TransferenciaService) { }

  ngOnInit() {

    if(!this.servicoTransf.dadosTransf.destino || !this.servicoTransf.dadosTransf.valor){
      this.servicoTransf.prev(0)
    }

  }

  enviaToken(){
    
  }

}
