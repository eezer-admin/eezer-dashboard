
import { of as observableOf, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

let counter = 0;

@Injectable()
export class UserService {

  private users = {
    admin: { name: 'Admin', picture: 'assets/images/kitten-cosmic.png' }
  };

  private userArray: any[];

  constructor(private http: HttpClient) {
    // this.userArray = Object.values(this.users);
  }

  getUsers(): Observable<any> {
    return observableOf(this.users);
  }

  getUserArray(): Observable<any[]> {
    return observableOf(this.userArray);
  }

  getUser(): Observable<any> {
    counter = (counter + 1) % this.userArray.length;
    return observableOf(this.userArray[counter]);
  }

  getUsersData(calbk: any) {
    let result = this.http.get('/getusers').subscribe(users => calbk(users));
  }
}
