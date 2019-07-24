import { Component } from '@angular/core';
import { VehiclesService } from '../../@core/data/vehicles.service';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../@core/data/users.service';

@Component({
  selector: 'ngx-dashboard',
  styleUrls: ['./dashboard.component.scss'],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {

  numberOfDrivers: number = 0;
  numberOfVehicles: number = 0;


  constructor(private vehiclesService: VehiclesService, private userService: UserService,
    private toastr: ToastrService) {
    this.getNumberofVehicles();
    this.getNumberofDrivers();
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
}
