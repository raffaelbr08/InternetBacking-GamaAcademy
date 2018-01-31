import { Injectable } from '@angular/core';
import {Http, Response, RequestOptions, Headers} from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { LoginService } from './login.service';

@Injectable()
export class ExtratoService {

  
  conrrentista = {
    contacorrente: '',
    dataInicial: '',
    dataFinal: ''
  }
  
  extrato = {
    transferencias: [],
    saldoAtualizado: ''
  } 
  
  url = 'http://localhost:3000/v1/extrato/'
  
  // constructor(public http: Http, private loginService: LoginService) { }
  constructor(private http: HttpClient, private loginService: LoginService) {
    

  }
  
  getExtrato(dataInicial = '', dataFinal = ''): Observable<any>{

    this.conrrentista.contacorrente = this.loginService.response.correntista.contaCorrente

    const opcoesHttp = { headers: new HttpHeaders(
          { 'Content-Type': 'application/json',
        'x-access-token': this.loginService.response.token }
      )
    }

    this.conrrentista.dataInicial = dataInicial
    this.conrrentista.dataFinal = dataFinal
    
    return this.http.post(this.url, this.conrrentista, opcoesHttp);
  }

}
