import { Injectable } from '@angular/core';
import {Http, Response, RequestOptions, Headers} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'  ;


@Injectable()
export class LoginService {

  public response = {
    nome:'',
    token:''
  }
  public login;


  url = 'http://localhost:3000/v1/login/'

  constructor(private http: Http) { 

  }

  efetuaLogin():Observable<Response>{
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let options = new RequestOptions({ headers: headers})
    return this.http.post(this.url,JSON.stringify(this.login),options);
  }

}
