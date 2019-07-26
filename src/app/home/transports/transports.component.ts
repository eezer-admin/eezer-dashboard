import { Component } from '@angular/core';
import * as L from 'leaflet';
import 'style-loader!leaflet/dist/leaflet.css';
import { ActivatedRoute } from '@angular/router';
import { TransportsService } from '../../@core/data/transports.service';

@Component({
  selector: 'ngx-transports',
  styleUrls: ['./transports.component.scss'],
  templateUrl: './transports.component.html',
})
export class TransportsComponent {

  myMap: L.Map;

  constructor(private service: TransportsService, private route: ActivatedRoute) {
    // Todo: get the latest transport id
    // this.drawLatestTransportRoute();
  }

  center: L.LatLng = L.latLng({ lat: -0.023559, lng: 37.9061928 });

  drawLatestTransportRoute(): any {
    this.service.getLatestTransportCoordination((result: any) => {

      if (!this.myMap)
        this.myMap = L.map('myMap',
          {
            layers: [
              L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' }),
            ],
            center: [-0.023559, 37.9061928],
            zoom: 6,
          });

      const polyline = L.polyline(result.data, { color: 'red', weight: 4 }).addTo(this.myMap);
      // zoom the map to the polyline
      this.myMap.fitBounds(polyline.getBounds());
    });
  }

}
