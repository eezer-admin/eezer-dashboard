import { Component } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';

import { UserService } from '../../../@core/data/users.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'ngx-smart-table',
  templateUrl: './drivers-table.component.html',
  styles: [`
    nb-card {
      transform: translate3d(0, 0, 0);
    }
  `],
})
export class DriversTableComponent {

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
      username: {
        title: 'Username',
        type: 'string',
      },
      password: {
        title: 'Password',
        type: 'string',
      },
      realName: {
        title: 'Real Name',
        type: 'string',
      },
      role: {
        title: 'Role',
        type: 'string',
      },
      organization: {
        title: 'Organization',
        type: 'string',
      },
      email: {
        title: 'E-mail',
        type: 'string',
      },
      phone: {
        title: 'Phone',
        type: 'string',
      },
      other: {
        title: 'Other',
        type: 'string',
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(private service: UserService, private toastr: ToastrService) {
    this.service.getDriversData((result: any) => {
      this.source.load(result);
    });
  }

  onCreateConfirm(event): void {
    if (window.confirm('Are you sure you want to create this?'))
      this.service.createUser(event.newData).subscribe((response) => {
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

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      this.service.removeUser(event.data).subscribe((response) => {
        if (response.success)
          event.confirm.resolve();
        else
          event.confirm.reject();
      }, response => {
        this.toastr.error(response.error.message_extra.join(', <br />'), response.error.message,
          { timeOut: 3000, enableHtml: true });

        event.confirm.reject();
      });
    } else {
      event.confirm.reject();
    }
  }
}
