
import { of as observableOf, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

let counter = 0;

@Injectable()
export class VehiclesService {

  constructor(private http: HttpClient) {
    // this.userArray = Object.values(this.users);
  }

  getVehiclesData(calbk: any) {
    this.http.get('/getvehicles').subscribe(vehicles => calbk(vehicles));
  }

  createVehicle(vehicle: any): Observable<any> {
    return this.http.post('/addvehicle', vehicle);
  }

  getNumberofVehicles(): Observable<any> {
    return this.http.get('/getnumbervehicles');
  }

  removeVehicle(data: any): Observable<any> {
    return this.http.delete('/rmvehicle/' + data.vehicleId);
  }
}
