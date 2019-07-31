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
      driverId: {
        title: 'Driver ID',
        type: 'string',
      },
      vehicleId: {
        title: 'Vehicle ID',
        type: 'string',
      },
      duration: {
        title: 'Duration',
        type: 'string',
        // sort: false,
        compareFunction: this.durationCompFunc,
      },
      distance: {
        title: 'Distance (m)',
        type: 'string',
      },
      started: {
        title: 'Start time',
        type: 'string',
      },
      ended: {
        title: 'End time',
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
    },
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(private service: TransportsService, private _router: Router) {
    this.service.getTransportsData((result: any) => {
      result.data.forEach(transport => {
        transport.started = this.formatDate(transport.started)
        transport.ended = this.formatDate(transport.ended)
        transport.duration = this.formatSeconds(transport.duration);
      });
      this.source.load(result.data);
    });
  }

  formatDate(date) {
    const d = new Date(date),
      year = d.getFullYear();

    let month = '' + (d.getMonth() + 1),
      day = '' + d.getDate();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    let result = [year, month, day].join('-');
    result += ' ' + d.toLocaleTimeString();
    return result;
  }

  formatSeconds(sec: string): string {
    const sec_num = parseInt(sec, 10),
      hours = Math.floor(sec_num / 3600),
      minutes = Math.floor((sec_num - (hours * 3600)) / 60),
      seconds = sec_num - (hours * 3600) - (minutes * 60);

    let strHours, strMinutes, strSeconds;

    if (hours < 10) { strHours = '0' + hours; }
    if (minutes < 10) { strMinutes = '0' + minutes; }
    if (seconds < 10) { strSeconds = '0' + seconds; }

    return hours + 'h ' + minutes + 'm ' + seconds + 's ';
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

  durationCompFunc(direction: number, a: string, b: string): number {
    let num1 = 0, num2 = 0;

    num1 = parseInt(a.replace('h ', '').replace('m ', '').replace('s ', ''), 10);
    num2 = parseInt(b.replace('h ', '').replace('m ', '').replace('s ', ''), 10);

    if (num1 < num2) {
      return -1 * direction;
    }
    if (num1 > num2) {
      return direction;
    }

    return 0;
  }
}
