import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { ExtratoService } from '../../services/extrato.service';

@Component({
  selector: 'app-extrato',
  templateUrl: './extrato.component.html',
  styleUrls: ['./extrato.component.scss']
})
export class ExtratoComponent implements OnInit {
  dados = {}

  constructor( public servicoLogin: LoginService, public servicoExtrato: ExtratoService) { }

  ngOnInit() {
    this.dados = this.servicoLogin.response;
    this.servicoExtrato.getExtrato()
    .subscribe(
      dados=>{
        console.log("dados", dados)
      },error=>{

      }
    )
    
  }

}
