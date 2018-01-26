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


  constructor(private servicoLogin: LoginService, private servicoTransf: TransferenciaService) { }

  ngOnInit() {
     this.dadosUsuario = this.servicoLogin.response.correntista;

  }

  realizaTrasnf(fomulario: NgForm): void{
    this.dadosTransf = fomulario.value;
    this.servicoTransf.dadosTransf = fomulario.value;
    this.servicoTransf.dadosTransf.origem = this.servicoLogin.response.correntista.contaCorrente;
    this.servicoTransf.postTransf()
    .subscribe(
      dados=>{
        alert(dados)
       

      },error=>{

      }
    )
  }

}