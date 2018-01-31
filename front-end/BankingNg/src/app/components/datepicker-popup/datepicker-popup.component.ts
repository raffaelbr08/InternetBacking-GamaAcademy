import { Component, OnInit, Input } from '@angular/core'
import * as moment from 'moment'
import * as pubSub from 'pubsub-js'
import { ExtratoService } from '../../services/extrato.service';



@Component({
  selector: 'app-datepicker-popup',
  templateUrl: './datepicker-popup.component.html',
  styleUrls: ['./datepicker-popup.component.scss']
})
export class DatepickerPopupComponent implements OnInit {

  DdataInicial
  DdataFinal

  dataF
  dataI
  
  constructor( private extratoService: ExtratoService) {
   }

  ngOnInit() {
    this.extratoService.conrrentista.dataInicial = ''
    this.extratoService.conrrentista.dataFinal = ''
  }
  mudou(){
    console.log("mudou!")
  }

  enviaData($event){
    $event.preventDefault()
    console.log(this.DdataInicial, this.DdataFinal)
    this.extratoService.getExtrato(this.DdataInicial, this.DdataFinal)
                        .subscribe(
                          res=>{
                            pubSub.publish('NOVO_EXTRATO', res.transferencias)
                            
                          }, error => {
                            console.log(error)
                        })
  }

}
