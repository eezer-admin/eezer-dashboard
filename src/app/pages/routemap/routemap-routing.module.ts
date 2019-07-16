import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RoutemapComponent } from './routemap.component';
import { LeafletComponent } from './leaflet/leaflet.component';

const routes: Routes = [{
  path: '',
  component: RoutemapComponent,
  children: [ {
    path: 'leaflet/:id',
    component: LeafletComponent,
  }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RouteMapRoutingModule { }

export const routedComponents = [
  RoutemapComponent,
  LeafletComponent,
];
