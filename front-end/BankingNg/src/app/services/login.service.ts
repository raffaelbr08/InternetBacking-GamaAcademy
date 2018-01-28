import { Injectable } from '@angular/core';
import {Http, Response, RequestOptions, Headers} from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';



@Injectable()
export class LoginService {

  public response = {
    correntista:{
      cpf:'',
      agencia:'',
      contaCorrente:'',
      saldo:'',
      nome:'',
      updated_at:''
    },
    token: ''
  }
  public login;

  url = 'http://localhost:3000/v1/login/'

  // construtor
  // constructor(private http: Http, private router: Router) { }
  constructor(private http: HttpClient, private router: Router) { }

  // faz o login e retorna para o metodo do componente de login
  efetuaLogin(): Observable<any> {
    // const headers = new Headers();
    // headers.append('Content-Type', 'application/json');

    // const options = new RequestOptions({ headers: headers})

    const opcoesHttp = {
      headers: new HttpHeaders(
        {
          'Content-Type': 'application/json'
        }
      )
    }

    return this.http.post(this.url, this.login, opcoesHttp);
  }

  // metodo para efeturar logout
  logout(): void {
    this.response = {
      correntista: {
        cpf: '',
        agencia: '',
        contaCorrente: '',
        saldo: '',
        nome: '',
        updated_at: ''
      },
      token: ''
    }
    this.router.navigate(['']);
  }

  // verifica se o usuario esta logado
  check(): boolean {
    return this.response.token !== '' ? true : false;
  }

}
