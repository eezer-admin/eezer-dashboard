
import { of as observableOf, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

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
    this.http.get('/getusers').subscribe(users => calbk(users));
  }

  createUser(user: any): Observable<any> {
    return this.http.post('/adduser', user);
  }

  removeUser(user: any): Observable<any> {

    // const options = { params: new HttpParams().set('username', user.email) };

    return this.http.delete('/rmuser/' + user.email);
  }

  getNumberofDrivers(): Observable<any> {
    return this.http.get('/getNumberDrivers');
  }
}
