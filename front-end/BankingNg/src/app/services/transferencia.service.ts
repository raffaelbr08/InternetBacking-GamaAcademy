import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
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

  constructor(private http: Http, private loginService: LoginService) { }

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

  postTransf(): Observable<Response> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('x-access-token', this.loginService.response.token)
    let options = new RequestOptions({ headers: headers })
    return this.http.post(this.url, this.dadosTransf, options)

  }


  getFavorecidos(contaCorrente): Observable<Response> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('x-access-token', this.loginService.response.token)
    let options = new RequestOptions({ headers: headers })
    return this.http.get(`${this.url2}${contaCorrente}`, options)

  }

}
