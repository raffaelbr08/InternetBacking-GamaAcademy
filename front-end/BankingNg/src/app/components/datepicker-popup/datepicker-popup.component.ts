import { Component, OnInit, Input } from '@angular/core';
import * as moment from 'moment';
import { TransferenciaService } from '../../services/transferencia.service';
import { ExtratoService } from '../../services/extrato.service';
import { ExtratoComponent } from '../../pages/extrato/extrato.component'

@Component({
  selector: 'app-datepicker-popup',
  templateUrl: './datepicker-popup.component.html',
  styleUrls: ['./datepicker-popup.component.scss']
})
export class DatepickerPopupComponent implements OnInit {

  DdataInicial
  DdataFinal


  constructor( private extratoService: ExtratoService) { }

  ngOnInit() {
    this.extratoService.conrrentista.dataInicial = ''
    this.extratoService.conrrentista.dataFinal = ''
  }

  enviaData($event){
    $event.preventDefault()

    this.DdataFinal.month =  this.DdataFinal.month -1
    this.DdataInicial.month = this.DdataInicial.month -1

    let inicial = moment(this.DdataInicial)
    let final = moment(this.DdataFinal)
    
    console.log(this.DdataInicial, this.DdataFinal)

    this.extratoService.getExtrato(inicial.format('YYYY-MM-DD'), final.format('YYYY-MM-DD'))
                        .subscribe(
                          res=>{
                            this.extratoService.extrato.transferencias = [].concat(res.transferencias)

                            console.log(this.extratoService.extrato)
                          }, error => {
                            console.log(error)
                        })
  }

}
