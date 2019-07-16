import { Component } from '@angular/core';
import * as L from 'leaflet';
import 'style-loader!leaflet/dist/leaflet.css';
import { TransportsService } from '../../../@core/data/transports.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ngx-transports',
  styleUrls: ['./transports.component.scss'],
  templateUrl: './transports.component.html',
})
export class TransportsComponent {

  myMap: L.Map;

  constructor(private service: TransportsService, private route: ActivatedRoute) {
    this.getCoords('7056b8ba-f479-f5bd-f061-a042c0385624');
  }

  center: L.LatLng = L.latLng({ lat: -0.023559, lng: 37.9061928 });

  getCoords(id: string): any {
    this.service.getCoords(id, (result: any) => {

      if (!this.myMap)
        this.myMap = L.map('myMap',
          {
            layers: [
              L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' }),
            ],
            center: [-0.023559, 37.9061928],
            zoom: 6
          });

      var polyline = L.polyline(result.data, { color: 'red', weight: 4 }).addTo(this.myMap);
      // zoom the map to the polyline
      this.myMap.fitBounds(polyline.getBounds());
    });
  }

}
