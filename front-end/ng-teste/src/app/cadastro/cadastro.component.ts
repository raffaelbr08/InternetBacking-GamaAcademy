import { FotoComponent } from './../foto/foto.component';
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styles: []
})
export class CadastroComponent implements OnInit {

  foto = new FotoComponent()

  constructor(private ajax: HttpClient) { }

  ngOnInit() {
  }

  salvar(){
    const headers = {headers: new HttpHeaders({'Content-Type': 'application/json'}) }
    this.ajax.post('http://localhost:3000/v1/fotos', JSON.stringify(this.foto), headers)
    .subscribe(
      resposta => {
        console.log(resposta)
        this.foto = new FotoComponent()
      }, erro => {
        console.log(erro)
      }
    )
    console.log('enviou!');
  }

}
