import { Component, OnInit, Input } from '@angular/core';
import { TransferenciaService } from '../../../services/transferencia.service';
import { LoginService } from '../../../services/login.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-valor-transferencia',
  templateUrl: './valor.component.html',
  styleUrls: ['./valor.component.scss']
})
export class ValorComponent implements OnInit {


  constructor(private servicoLogin: LoginService, private servicoTransf: TransferenciaService) {
  }

  ngOnInit() {
  }

  next(valor) {

    console.log(valor)

    if (this.servicoTransf.dadosTransf.valor) {
      this.servicoTransf.next()
    }
  }
}
