import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TablesComponent } from './tables.component';
import { SmartTableComponent } from './smart-table/smart-table.component';
import { UsersTableComponent } from './users/users-table.component';
import { VehiclesTableComponent } from './vehicles/vehicles-table.component';
import { TransportsTableComponent } from './transports/transports-table.component';
import { DriversTableComponent } from './drivers/drivers-table.component';

const routes: Routes = [{
  path: '',
  component: TablesComponent,
  children: [{
    path: 'smart-table',
    component: SmartTableComponent,
  },
  {
    path: 'users',
    component: UsersTableComponent,
  },
  {
    path: 'drivers',
    component: DriversTableComponent,
  },
  {
    path: 'vehicles',
    component: VehiclesTableComponent,
  },
  {
    path: 'transports',
    component: TransportsTableComponent,
  }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TablesRoutingModule { }

export const routedComponents = [
  TablesComponent,
  SmartTableComponent,
  UsersTableComponent,
  DriversTableComponent,
  VehiclesTableComponent,
  TransportsTableComponent,
];
