import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { LoginService } from './login.service';

@Injectable()
export class TransferenciaService {

  url = 'http://localhost:3000/v1/transferencias/'
  url2 ='http://localhost:3000/v1/correntistas/'

  dadosTransf = {
    origem:''
  }

  constructor(private http: Http, private loginService: LoginService) { }
  
  
  postTransf():Observable<Response>{
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('x-access-token', this.loginService.response.token)
      let options = new RequestOptions({ headers: headers})
      return this.http.post(this.url,this.dadosTransf,options)

  }

  getCorrentista(contaCorrente):Observable<Response>{
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('x-access-token', this.loginService.response.token)
    let options = new RequestOptions({ headers: headers})
    return this.http.get(`${this.url2}${contaCorrente}`,options)

}
  
}
