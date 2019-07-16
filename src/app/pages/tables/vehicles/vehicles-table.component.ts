import { Component } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';

import { VehiclesService } from '../../../@core/data/vehicles.service';

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
      realName: {
        title: 'Real Name',
        type: 'string',
      },
      location: {
        title: 'Location',
        type: 'string',
      },
      role: {
        title: 'Role',
        type: 'string',
      },
      createdTime: {
        title: 'CreatedTime',
        type: 'string',
      }
    }
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(private service: VehiclesService) {
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
}
