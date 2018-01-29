import { Router } from '@angular/router';
import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse, HttpClient } from '@angular/common/http';
// tslint:disable-next-line:import-blacklist
import { Observable } from 'rxjs/Rx';
import { LoginService } from '../services/login.service';
import { NgbModal, NgbModalRef, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap'
import { ModalLoginExpiradoComponent } from '../components/modal-login-expirado/modal-login-expirado.component'

@Injectable()
export class CheckTokenInterceptor implements HttpInterceptor {

  modalref: NgbModalRef

  constructor(private injector: Injector, private router: Router, private modalService: NgbModal, public activeModal: NgbActiveModal) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(request).catch((errorResponse: HttpErrorResponse) => {

      const error = (typeof errorResponse.error !== 'object') ? JSON.parse(errorResponse.error) : errorResponse.error;

      if (errorResponse.status === 401 && error.message === 'Falha ao tentar autenticar o token!') {

        console.log("interceptor")

        alert(`Login expirado! \n Efetue um novo login.`)

        this.router.navigate([''])
      }

      return Observable.throw(errorResponse);
    });

  }
}
