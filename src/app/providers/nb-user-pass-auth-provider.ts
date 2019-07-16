import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import {
  NbAbstractAuthProvider,
  NbAuthResult,
  NbAuthSimpleToken
} from '@nebular/auth';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

export interface UserData {
  username: string;
  password: string;
}

export interface TokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
}

export interface AuthConfig {
  apiAddress: string;
}

@Injectable()
export class NBUserPassAuthProvider extends NbAbstractAuthProvider {

  protected defaultConfig: AuthConfig = {
    apiAddress: 'https://mdcxqhwaz8.execute-api.eu-west-1.amazonaws.com/prod',//'http://example.com/accesstoken',
  };
  protected config: AuthConfig;

  constructor(
    private httpClient: HttpClient
    // private authService: NbAuthService,
  ) {
    super();
  }

  logout(): Observable<NbAuthResult> {
    // return this.authService.logout('name');
    return Observable.create(obs => new NbAuthResult(
      true,
      {},
      '/',
      false,
      'Sign out success.',
    ));
  }

  authenticate(user: UserData): Observable<NbAuthResult> {
    // const headers: HttpHeaders = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    const headers: HttpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    // const body = `grant_type=password&username=${user.username}&password=${user.password}`;
    const body = {
      username: user.username,
      password: user.password
    };

    let result = this.httpClient.post<TokenResponse>(
      this.config.apiAddress,
      body, { headers },
    ).map((res: TokenResponse) => {
      const token = new NbAuthSimpleToken(res.access_token);
      // token.setValue(res.access_token);

      return new NbAuthResult(
        true,
        res,
        '/',
        false,
        `Sign in successful!`,
        token.token,
      );
    })
      .catch((res) => {
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
    throw new Error("Method not implemented.");
  }
}
