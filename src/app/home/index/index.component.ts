import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { VehiclesService } from '../../@core/data/vehicles.service';
import { UserService } from '../../@core/data/users.service';


@Component({
  selector: 'ngx-index',
  styleUrls: ['./index.component.scss'],
  templateUrl: './index.component.html',

})
export class IndexComponent {

  numberOfDrivers: number = 0;
  numberOfVehicles: number = 0;


  constructor(private vehiclesService: VehiclesService, private userService: UserService,
    private toastr: ToastrService) {
    // this.getNumberofVehicles();
    // this.getNumberofDrivers();
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
