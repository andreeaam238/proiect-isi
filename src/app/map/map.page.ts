import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Platform } from '@ionic/angular';
import { setDefaultOptions, loadModules } from 'esri-loader';

import esri = __esri; // Esri TypeScript Types

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {
  @ViewChild('map') mapEl: ElementRef;
  mapView: any = null;

  constructor(public platform: Platform) {}

  async getGeo() {
    await this.platform.ready();

    const [Map, MapView, Compass]: any = await loadModules([
      'esri/Map',
      'esri/views/MapView',
      'esri/widgets/Compass',
    ]).catch((err) => {
      console.error('ArcGIS: ', err);
    });

    let map = new Map({
      basemap: 'hybrid',
    });

    let mapView = new MapView({
      container: this.mapEl.nativeElement,
      center: [26.096306, 44.439663],
      zoom: 12,
      map: map,
    });

    let compassWidget = new Compass({
      view: mapView,
    });

    mapView.ui.add(compassWidget, 'top-left');
  }

  ngOnInit() {
    this.getGeo();
  }
}
