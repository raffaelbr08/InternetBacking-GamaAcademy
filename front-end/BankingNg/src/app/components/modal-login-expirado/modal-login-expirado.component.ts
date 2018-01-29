import { Component, OnInit } from '@angular/core'
import { NgbModal, NgbModalRef, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap'


@Component({
  selector: 'app-modal-login-expirado',
  template: `
  <ng-template #content let-c="close" let-d="dismiss">
    <div class="modal-header">
      <h4 class="modal-title">Login Expirado!</h4>
    </div>
    <div class="modal-body">
      <p>Seu tempo de acesso expirou, por favor realize um novo login</p>
    </div>
    <div class="modal-footer">
      <a href="/" class="btnLaranja cancela">Fazer login</a>
    </div>
  </ng-template>
  `
})
export class ModalLoginExpiradoComponent implements OnInit {

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

}
