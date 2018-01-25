import { Injectable } from '@angular/core';
import {Http, Response, RequestOptions, Headers} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { LoginService } from './login.service';

@Injectable()
export class ExtratoService {

  url = 'http://localhost:3000/v1/extrato/'

  constructor(public http: Http, private loginService: LoginService) { }

  getExtrato():Observable<Response>{
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', this.loginService.response.token)

    let options = new RequestOptions({ headers: headers})
    return this.http.post(this.url,this.loginService.response.correntista.contaCorrente,options);
  }

}
