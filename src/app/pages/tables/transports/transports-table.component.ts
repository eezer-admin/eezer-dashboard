import { Component } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';

import { TransportsService } from '../../../@core/data/transports.service';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-smart-table',
  templateUrl: './transports-table.component.html',
  styles: [`
    nb-card {
      transform: translate3d(0, 0, 0);
    }
  `],
})
export class TransportsTableComponent {

  settings = {
    actions: false,
    columns: {
      transportId: {
        title: 'ID',
        type: 'string',
      },
      driverId: {
        title: 'Driver ID',
        type: 'string',
      },
      vehicleId: {
        title: 'Vehicle ID',
        type: 'string',
      },
      duration: {
        title: 'Duration (s)',
        type: 'string',
      },
      distance: {
        title: 'Distance (m)',
        type: 'string',
      },
      passengerName: {
        title: 'Passenger',
        type: 'string',
      },
      gender: {
        title: 'Gender',
        type: 'string',
      },
      reason: {
        title: 'Reason',
        type: 'string',
      },
    }
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(private service: TransportsService, private _router: Router) {
    this.service.getTransportsData((result: any) => {
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
  onUserRowSelect(event): void {
    this._router.navigate(['/pages/routemap/leaflet/' + event.data.transportId]);
  }
}
