import { Component } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';

import { UserService } from '../../../@core/data/users.service';

@Component({
  selector: 'ngx-smart-table',
  templateUrl: './users-table.component.html',
  styles: [`
    nb-card {
      transform: translate3d(0, 0, 0);
    }
  `],
})
export class UsersTableComponent {

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
      }
    },
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(private service: UserService) {
    this.service.getUsersData((result: any) => {
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
