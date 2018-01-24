import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-listagem',
  templateUrl: './listagem.component.html' ,
  styles: []
})
export class ListagemComponent implements OnInit {

  titulo = 'CaelumPic';

  fotos: Object[] = []

  constructor(private ajax: HttpClient){}

  ngOnInit() {
    this.ajax.get<any>('http://localhost:3000/v1/fotos')
    .subscribe( jsonFotos => {
      this.fotos = jsonFotos
    })
  }

}
