import { Injectable } from '@angular/core';
import {Http, Response, RequestOptions, Headers} from '@angular/http';
import { Observable } from 'rxjs/Observable';



@Injectable()
export class LoginService {

  public response = {
    correntista:{
      cpf:'',
      agencia:'',
      contaCorrente:'',
      saldo:'',
      updated_at:''
    },   
    token: ""
  }
  public login;


  url = 'http://localhost:3000/v1/login/'

  constructor(private http: Http) { 

  }

  efetuaLogin():Observable<Response>{
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let options = new RequestOptions({ headers: headers})
    return this.http.post(this.url,this.login,options);
  }

}
