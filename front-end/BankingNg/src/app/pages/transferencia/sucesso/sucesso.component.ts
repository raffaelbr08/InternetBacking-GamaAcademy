import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../../services/login.service';
import { TransferenciaService } from '../../../services/transferencia.service';

@Component({
  selector: 'app-sucesso',
  templateUrl: './sucesso.component.html',
  styleUrls: ['./sucesso.component.scss']
})
export class SucessoComponent implements OnInit {

  constructor(private servicoLogin: LoginService, private servicoTransf: TransferenciaService) { }

  ngOnInit() {
  }

}
