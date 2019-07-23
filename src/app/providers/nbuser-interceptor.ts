import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/do';
import { NbAuthService } from '@nebular/auth';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators/tap';

@Injectable()
export class NbUserInterceptor implements HttpInterceptor {

  constructor(private authService: NbAuthService, private router: Router) {
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {

    let duplicate: HttpRequest<any>;

    if (req.body && req.body.email && req.body.password) {
      const loginModel = {
        username: req.body.email,
        password: req.body.password,
      };
      localStorage.setItem('username', req.body.email);

      duplicate = req.clone({ body: loginModel });
    }

    if (req.url.toLowerCase().lastIndexOf('https://mdcxqhwaz8.execute-api.eu-west-1.amazonaws.com/prod/api') === -1)
      duplicate = req.clone({
        url: 'https://mdcxqhwaz8.execute-api.eu-west-1.amazonaws.com/prod/api' + req.url,
      });

    if (duplicate === undefined)
      duplicate = req;

    return next.handle(duplicate).catch(err => {
      if (err.status === 401)
        this.authService.logout('email');

      return Observable.throw(err);
    });
  }
}
