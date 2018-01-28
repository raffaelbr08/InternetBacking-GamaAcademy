import { Injectable } from '@angular/core';
import {Http, Response, RequestOptions, Headers} from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { LoginService } from './login.service';

@Injectable()
export class ExtratoService {

  conrrentista = {
    contacorrente: this.loginService.response.correntista.contaCorrente
  }

  url = 'http://localhost:3000/v1/extrato/'

  // constructor(public http: Http, private loginService: LoginService) { }
  constructor(public http: HttpClient, private loginService: LoginService) { }

  getExtrato(): Observable<any>{
    const opcoesHttp = { headers: new HttpHeaders(
          { 'Content-Type': 'application/json',
        'x-access-token': this.loginService.response.token }
      )
    }
    // const headers = new Headers();
    // headers.append('Content-Type', 'application/json');
    // headers.append('x-access-token', this.loginService.response.token)

    // const options = new RequestOptions({ headers: headers})
    // return this.http.post(this.url, this.conrrentista, options);
    return this.http.post(this.url, this.conrrentista, opcoesHttp);
  }

}
