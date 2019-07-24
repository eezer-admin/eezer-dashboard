import { NgModule } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ChartModule } from 'angular2-chartjs';
import { NgxEchartsModule } from 'ngx-echarts';
import { ThemeModule } from '../../@theme/theme.module';
import { DashboardComponent } from './dashboard.component';
import { StatusCardComponent } from './status-card/status-card.component';
import { TransportsComponent } from './transports/transports.component';
import { TransportsService } from '../../@core/data/transports.service';
import { ChartjsComponent } from './charts/chartjs.component';
import { ChartjsPieComponent } from './charts/chartjs-pie.component';
import { ChartjsBarComponent } from './charts/chartjs-bar.component';
import { VehiclesService } from '../../@core/data/vehicles.service';


@NgModule({
  imports: [
    ThemeModule,
    NgxEchartsModule,
    NgxChartsModule,
    ChartModule,
  ],
  declarations: [
    DashboardComponent,
    StatusCardComponent,
    TransportsComponent,
    ChartjsComponent,
    ChartjsPieComponent,
    ChartjsBarComponent,
  ],
  providers: [
    TransportsService,
    VehiclesService,
  ],
})
export class DashboardModule { }
