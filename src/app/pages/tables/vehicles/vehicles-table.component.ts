import { Component } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';

import { VehiclesService } from '../../../@core/data/vehicles.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'ngx-smart-table',
  templateUrl: './vehicles-table.component.html',
  styles: [`
    nb-card {
      transform: translate3d(0, 0, 0);
    }
  `],
})
export class VehiclesTableComponent {

  settings = {
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmCreate: true,
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      vehicleId: {
        title: 'ID',
        type: 'string',
      },
      country: {
        title: 'Country',
        type: 'string',
      },
      region: {
        title: 'Region',
        type: 'string',
      },
      organization: {
        title: 'organization',
        type: 'string',
      },
      contact: {
        title: 'Contact',
        type: 'string',
      },
      phone: {
        title: 'Phone',
        type: 'string',
      },
      email: {
        title: 'Email',
        type: 'string',
      },
      address: {
        title: 'Address',
        type: 'string',
      },
      yearOfManufacture: {
        title: 'Year Of Manufacture',
        type: 'string',
      },
      handoverDate: {
        title: 'Handover Date',
        type: 'string',
      },
      runningTime: {
        title: 'Running Time',
        type: 'string',
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(private service: VehiclesService, private toastr: ToastrService) {
    this.service.getVehiclesData((result: any) => {
      this.source.load(result.data);
    });
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

  onCreateConfirm(event): void {
    if (window.confirm('Are you sure you want to create this?'))
      this.service.createVehicle(event.newData).subscribe((response) => {
        if (response.success)
          event.confirm.resolve();
        else
          event.confirm.reject();
      }, response => {
        this.toastr.error(response.error.message_extra.join(', <br />'), response.error.message,
          { timeOut: 3000, enableHtml: true });

        event.confirm.reject();
      });
    else
      event.confirm.reject();
  }
}
