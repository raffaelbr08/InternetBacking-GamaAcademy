import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../../services/login.service';
import { TransferenciaService } from '../../../services/transferencia.service';

@Component({
  selector: 'app-favorecidos',
  templateUrl: './favorecidos.component.html',
  styleUrls: ['./favorecidos.component.scss']
})
export class FavorecidosComponent implements OnInit {

  dadosUsuario

  favorecidos = [
    { agencia: "1", contaCorrente: "123", nome: "everton" },
    { agencia: "2", contaCorrente: "3123", nome: "Fabiano" },
    { agencia: "33", contaCorrente: "23123", nome: "Felipe" }
  ]

  constructor(private servicoLogin: LoginService, private servicoTransf: TransferenciaService) {
    this.dadosUsuario = this.servicoLogin.response.correntista
   }

  ngOnInit() {

    console.log(this.dadosUsuario.contaCorrente)

    this.servicoTransf.getFavorecidos(this.dadosUsuario.contaCorrente)
      .subscribe(res => {
        const correntista = res.json()
        this.favorecidos = correntista.correntista.favorecidos

        console.log(correntista.correntista.favorecidos)
      }, error => {
      })
  }

  selecionaFavorecido(favorecido, $event){

    this.servicoTransf.dadosTransf.destino = favorecido.contaCorrente
    this.servicoTransf.dadosTransf.agenciaFavorecido = favorecido.agencia
    this.servicoTransf.dadosTransf.nomeFavorecido = favorecido.nome
    
    setTimeout(() => {
      this.servicoTransf.next()
      this.servicoTransf.isFavorecido = true
    }, 200);
    
  }
  

}
