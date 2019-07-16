import { Component } from '@angular/core';

import * as L from 'leaflet';
import 'style-loader!leaflet/dist/leaflet.css';
import { ActivatedRoute } from '@angular/router';
import { TransportsService } from '../../../@core/data/transports.service';

@Component({
  selector: 'ngx-leaflet',
  styleUrls: ['./leaflet.component.scss'],
  template: `
    <nb-card>
      <nb-card-header>Route Map</nb-card-header>
      <nb-card-body>
        <div id="myMap"></div>
      </nb-card-body>
    </nb-card>
  `,
})

export class LeafletComponent {

  myMap: L.Map;

  constructor(private service: TransportsService, private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      this.getCoords(params['id']);
    });
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