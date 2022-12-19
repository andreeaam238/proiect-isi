import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Platform } from '@ionic/angular';
import { loadModules } from 'esri-loader';

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

    const [esriConfig, Map, MapView, Compass, Locate, Track, Graphic]: any =
      await loadModules([
        'esri/config',
        'esri/Map',
        'esri/views/MapView',
        'esri/widgets/Compass',
        'esri/widgets/Locate',
        'esri/widgets/Track',
        'esri/Graphic',
      ]).catch((err) => {
        console.error('ArcGIS: ', err);
      });

    esriConfig.apiKey =
      'AAPK96c3dc2e11734f96852b9f83319128a7AwtXTcRvExfL9-yYgVLNKW5ONYv3yLXUNbel0FxQySEL4FyIbt1Fuw7njdOAaljf';

    let map = new Map({
      basemap: 'arcgis-navigation',
    });

    let mapView = new MapView({
      container: this.mapEl.nativeElement,
      center: [26.096306, 44.439663],
      zoom: 10,
      map: map,
    });

    let compassWidget = new Compass({
      view: mapView,
    });

    mapView.ui.add(compassWidget, 'top-left');

    const track = new Track({
      view: mapView,
      goToLocationEnabled: true,
      scale: 5000,
    });

    mapView.ui.add(track, 'top-left');

    mapView.when(() => {
      track.start();
    });
  }

  ngOnInit() {
    this.getGeo();
  }
}
