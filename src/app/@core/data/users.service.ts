
import { of as observableOf, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { e } from '@angular/core/src/render3';

let counter = 0;

@Injectable()
export class UserService {

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

  getDriversData(calbk: any) {
    this.http.get('/getusers').subscribe((result: any) => {
      const drivers = result.data.filter(el => el.role.toLowerCase() === 'driver');


      calbk(drivers);

    });

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
