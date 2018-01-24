import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs/Observable";
//import 'rxjs/add/operator/map';

import { FotoComponent } from "../foto/foto.component";




export class FotoService {

    private url = 'http://localhost:3000/v1/fotos'

    private headers = {headers: new HttpHeaders({'Content-Type': 'application/json'}) }

    constructor(private ajax: HttpClient){}

    listar(): Observable<Object>{
        return this.ajax.get(this.url)
    }

    cadastrar(foto: FotoComponent){
        return this.ajax.post(this.url, JSON.stringify(foto), this.headers)
    }

    deletar(){}

    consultar(){}

    alterar(){}

}