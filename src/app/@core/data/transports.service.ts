
import { of as observableOf, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

let counter = 0;

@Injectable()
export class TransportsService {

  constructor(private http: HttpClient) {
    // this.userArray = Object.values(this.users);
  }

  getTransportsData(calbk: any) {
    this.http.get('/all').subscribe(transports => calbk(transports));
  }

  getCoords(id: any, calbk: any): any {
    this.http.get('/coords/' + id).subscribe(coords => calbk(coords));
  }
}
