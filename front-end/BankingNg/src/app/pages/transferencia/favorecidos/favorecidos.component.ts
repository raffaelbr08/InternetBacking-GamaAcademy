import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../../services/login.service';
import { TransferenciaService } from '../../../services/transferencia.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-favorecidos',
  templateUrl: './favorecidos.component.html',
  styleUrls: ['./favorecidos.component.scss']
})
export class FavorecidosComponent implements OnInit {

  dadosUsuario

  favorecidos = []

  constructor(private servicoLogin: LoginService, private servicoTransf: TransferenciaService, private router: Router) {
    this.dadosUsuario = this.servicoLogin.response.correntista
   }

  ngOnInit() {

    console.log(this.dadosUsuario.contaCorrente)

    this.servicoTransf.getFavorecidos(this.dadosUsuario.contaCorrente)
      .subscribe(res => {
        const correntista = res
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
      this.router.navigate(['/transferencia/outra-conta'])
      this.servicoTransf.isFavorecido = true
    }, 200);
    
  }
  

}
