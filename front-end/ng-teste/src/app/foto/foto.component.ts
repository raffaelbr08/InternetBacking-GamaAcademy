import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-foto',
  template: `
    <img src="{{url}}" class="img-fluid" alt="{{titulo}}">
  `,
  styles: []
})

export class FotoComponent{

  @Input() url:string = "";
  @Input() titulo: string = "";

  descricao:string = "";

}
