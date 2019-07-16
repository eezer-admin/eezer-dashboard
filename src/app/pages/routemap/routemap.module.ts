import { NgModule } from '@angular/core';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
// import { NgxEchartsModule } from 'ngx-echarts';

import { ThemeModule } from '../../@theme/theme.module';
import { RouteMapRoutingModule, routedComponents } from './routemap-routing.module';
import { TransportsService } from '../../@core/data/transports.service';

@NgModule({
  imports: [
    ThemeModule,
    LeafletModule.forRoot(),
    RouteMapRoutingModule,
    // NgxEchartsModule,
  ],
  exports: [],
  declarations: [
    ...routedComponents,
  ],
  providers: [
    TransportsService
  ],
})
export class RouteMapModule { }
