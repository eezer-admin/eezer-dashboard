
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
    this.http.get('/latestroute').subscribe((res: any) => calbk(res.data.coordinates));
  }

  getTotalDistance(): Observable<any> {
    return this.http.get('/totaldistance');
  }

  getTotalDuration(): Observable<any> {
    return this.http.get('/totalduration');
  }
}
