import {Component, Input} from '@angular/core';

import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { Event } from '@angular/router/src/events';

@Component({
  selector: 'ngbd-modal',
  templateUrl: './modal.component.html'
})
export class ModalComponent {
  closeResult: string;
  @Input() hideHeader: Boolean
  @Input() btnClass: String
  @Input() btnText: String = "Abrir modal"

  constructor(private modalService: NgbModal) {
  }

  open(content, $event: UIEvent) {

    $event.preventDefault()
    
    this.modalService.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
}