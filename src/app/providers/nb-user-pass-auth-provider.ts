import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import {
  NbAbstractAuthProvider,
  NbAuthResult,
  NbAuthSimpleToken,
  NbAuthJWTToken,
  NbAuthService,
  NbTokenService,
} from '@nebular/auth';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { log } from 'util';
import { Router } from '@angular/router';
import { switchMap, map, catchError } from 'rxjs/operators';

export interface UserData {
  email: string;
  password: string;
}

// export interface TokenResponse {
//   data: string;
//   // access_token: string;
//   // token_type: string;
//   // expires_in: number;
// }

export interface AuthConfig {
  apiAddress: string;
}

@Injectable()
export class NBUserPassAuthProvider extends NbAbstractAuthProvider {

  protected defaultConfig: AuthConfig = {
    apiAddress: '/login',
  };
  protected config: AuthConfig;

  constructor(
    private httpClient: HttpClient,
    // private authService: NbAuthService,
    private tokenService: NbTokenService,
    private router: Router,

  ) {
    super();
  }

  logout(): Observable<NbAuthResult> {

    this.tokenService.clear();
    localStorage.setItem('username', '');
    // this.router.navigate(['auth/login']);
    // this.router.navigateByUrl('/auth/login');
    window.location.href = '/';

    return Observable.create(obs => new NbAuthResult(true, {}, '/', [], 'Sign out success.'));
  }

  authenticate(user: UserData): Observable<NbAuthResult> {
    // const headers: HttpHeaders = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    const headers: HttpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    // const body = `grant_type=password&username=${user.username}&password=${user.password}`;
    const body = {
      username: user.email,
      password: user.password,
    };
    const result = this.httpClient.post<any>(
      this.config.apiAddress,
      body,
      { headers },
    ).map((res: any) => {
      const JWTToken = new NbAuthJWTToken(res.data);
      localStorage.setItem('username', res.data.username);

      return new NbAuthResult(
        true,
        JWTToken.token,
        '/pages/dashboard',
        false,
        `Sign in successful!`,
        res.data.token,
      );
    }).catch((res) => {
      let errors = [];
      if (res instanceof HttpErrorResponse) {
        errors = ['Wrong combination of username/password.'];
      } else {
        errors.push('Something went wrong.');
      }

      return Observable.create(obs =>
        new NbAuthResult(
          false,
          res,
          null,
          errors,
        ));
    });

    return result as Observable<NbAuthResult>;
  }

  getConfigValue(key: string) {
    return this.config[key];
  }

  register(data?: UserData): Observable<NbAuthResult> {
    throw new Error('Method not implemented.');
  }
  requestPassword(data?: UserData): Observable<NbAuthResult> {
    throw new Error('Method not implemented.');
  }
  resetPassword(data?: UserData): Observable<NbAuthResult> {
    throw new Error('Method not implemented.');
  }
  refreshToken(): Observable<NbAuthResult> {
    throw new Error('Method not implemented.');
  }
}
