import { NgModule } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ChartModule } from 'angular2-chartjs';
import { NgxEchartsModule } from 'ngx-echarts';
import { StatusCardComponent } from './status-card/status-card.component';
import { TransportsComponent } from './transports/transports.component';
import { ChartjsComponent } from './charts/chartjs.component';
import { ChartjsPieComponent } from './charts/chartjs-pie.component';
import { ChartjsBarComponent } from './charts/chartjs-bar.component';
import { TransportsService } from '../@core/data/transports.service';
import { VehiclesService } from '../@core/data/vehicles.service';
import { ThemeModule } from '../@theme/theme.module';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { IndexComponent } from './index/index.component';

@NgModule({
  imports: [
    ThemeModule,
    NgxEchartsModule,
    NgxChartsModule,
    ChartModule,
    HomeRoutingModule,
  ],
  declarations: [
    HomeComponent,
    StatusCardComponent,
    TransportsComponent,
    IndexComponent,
    ChartjsComponent,
    ChartjsPieComponent,
    ChartjsBarComponent,
  ],
  providers: [
    TransportsService,
    VehiclesService,
  ],
})
export class HomeModule { }
