import { Router } from '@angular/router';
import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse, HttpClient } from '@angular/common/http';
// tslint:disable-next-line:import-blacklist
import { Observable } from 'rxjs/Rx';
import { LoginService } from '../services/login.service';

@Injectable()
export class CheckTokenInterceptor implements HttpInterceptor {

  constructor(private injector: Injector, private router: Router) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(request).catch((errorResponse: HttpErrorResponse) => {

      const error = (typeof errorResponse.error !== 'object') ? JSON.parse(errorResponse.error) : errorResponse.error;

      if (errorResponse.status === 401 && error.message === 'Falha ao tentar autenticar o token!') {
        this.router.navigate(['']);
      }

      return Observable.throw(errorResponse);
    });

  }
}
