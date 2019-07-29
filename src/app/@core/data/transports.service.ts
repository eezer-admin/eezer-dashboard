
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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

  getLatestTransportCoordination(calbk: any): any {
    // todo: fetch the latest one from the BE
    const latestId = 'f065396a-23dc-46fb-be60-b7650b62f1d2';
    this.http.get('/coords/' + latestId).subscribe(coords => calbk(coords));
  }

  getTotalDistance(): Observable<any> {
    return this.http.get('/totaldistance');
  }

  getTotalDuration(): Observable<any> {
    return this.http.get('/totalduration');
  }
}
