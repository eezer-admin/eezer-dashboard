import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { VehiclesService } from '../../@core/data/vehicles.service';
import { UserService } from '../../@core/data/users.service';
import { TransportsService } from '../../@core/data/transports.service';


@Component({
  selector: 'ngx-index',
  styleUrls: ['./index.component.scss'],
  templateUrl: './index.component.html',

})
export class IndexComponent {

  numberOfDrivers: number = 0;
  numberOfVehicles: number = 0;
  totalDistance = '0';
  totalDuration: number = 0;

  constructor(private vehiclesService: VehiclesService, private userService: UserService,
    private transportService: TransportsService,
    private toastr: ToastrService) {
    this.getNumberofVehicles();
    this.getNumberofDrivers();
    this.getTotalDistance();
    this.getTotalDuration();
  }

  getNumberofVehicles(): void {
    this.vehiclesService.getNumberofVehicles().subscribe((response) => {
      this.numberOfVehicles = response.data;
    });
  }

  getNumberofDrivers(): void {
    this.userService.getNumberofDrivers().subscribe((response) => {
      this.numberOfDrivers = response.data;
    });
  }

  getTotalDistance(): void {
    this.transportService.getTotalDistance().subscribe((response) => {
      this.totalDistance = this.reformatNumber(response.data);
    });
  }

  getTotalDuration(): void {
    this.transportService.getTotalDuration().subscribe((response) => {
      this.totalDuration = response;
    });
  }

  reformatNumber(num: number): string {
    return num.toString().replace(/(\d)(?=(\d{3})+$)/g, '$1 ');
  }
}
