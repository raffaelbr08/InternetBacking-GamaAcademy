import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { LoginService } from './login.service';

@Injectable()
export class TransferenciaService {

  url = 'http://localhost:3000/v1/transferencias/'
  url2 = 'http://localhost:3000/v1/correntistas/'

  dadosTransf = {
    nomeFavorecido: "",
    agenciaFavorecido: "",
    salvarFavorecido: false,
    valor: "",
    destino: "",
    origem: ""
  }
  isFavorecido = false
  fase = 0

  mensagemErro = ""

  constructor(private http: HttpClient, private loginService: LoginService) { }

  next(number = undefined) {
    if (number != undefined) {
      this.fase = number
    } else {
      this.fase++
    }
    console.log("[prev]", number, this.fase)
  }
  prev(number = undefined) {

    if (number != undefined) {
      this.fase = number
    } else {
      this.fase = this.fase - 1
    }
    console.log("[prev]", number, this.fase)
  }

  resetDados() {
    this.dadosTransf = {
      nomeFavorecido: "",
      agenciaFavorecido: "",
      salvarFavorecido: false,
      valor: "",
      destino: "",
      origem: ""
    }
  }

  postTransf(): Observable<any> {
    let headers = new Headers();

    const opcoesHttp = {
      headers: new HttpHeaders(
        {
          'Content-Type': 'application/json',
          'x-access-token': this.loginService.response.token
        }
      )
    }
    return this.http.post(this.url, this.dadosTransf, opcoesHttp)

  }


  getFavorecidos(contaCorrente): Observable<any> {
    let headers = new Headers();
    
    const opcoesHttp = {
      headers: new HttpHeaders(
        {
          'Content-Type': 'application/json',
          'x-access-token': this.loginService.response.token
        }
      )
    }
    return this.http.get(`${this.url2}${contaCorrente}`, opcoesHttp)

  }

}
