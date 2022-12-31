import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Platform } from '@ionic/angular';
import { loadModules, setDefaultOptions } from 'esri-loader';

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
    setDefaultOptions({ css: true });

    const [
      esriConfig,
      Map,
      MapView,
      Compass,
      Locate,
      Track,
      Graphic,
      FeatureLayer,
      LayerList,
      BasemapGallery,
      Expand,
    ]: any = await loadModules([
      'esri/config',
      'esri/Map',
      'esri/views/MapView',
      'esri/widgets/Compass',
      'esri/widgets/Locate',
      'esri/widgets/Track',
      'esri/Graphic',
      'esri/layers/FeatureLayer',
      'esri/widgets/LayerList',
      'esri/widgets/BasemapGallery',
      'esri/widgets/Expand',
    ]).catch((err) => {
      console.error('ArcGIS: ', err);
    });

    esriConfig.apiKey =
      'AAPK96c3dc2e11734f96852b9f83319128a7AwtXTcRvExfL9-yYgVLNKW5ONYv3yLXUNbel0FxQySEL4FyIbt1Fuw7njdOAaljf';

    let map = new Map({
      basemap: 'arcgis-navigation',
    });

    const popupTrails = {
      title: '{Name}',
      content: [
        {
          type: 'fields',
          fieldInfos: [
            {
              fieldName: 'Length',
              label: 'Length',
              isEditable: false,
              tooltip: '',
              visible: true,
              format: null,
              stringFieldOption: 'text-box',
            },
          ],
        },
      ],
    };

    const bikeTrailsLineRenderer = {
      type: 'simple',
      symbol: {
        color: '#FF7518',
        type: 'simple-line',
        style: 'solid',
        width: '5px',
        height: '5px',
      },
    };

    const bikeTrailsLineFeatureLayer: __esri.FeatureLayer = new FeatureLayer({
      url: 'https://services7.arcgis.com/BPmbOobL1X8Rtqka/arcgis/rest/services/piste_de_biciclete_bucuresti/FeatureServer/0',
      renderer: bikeTrailsLineRenderer,
      outFields: ['Name', 'Length'],
      popupTemplate: popupTrails,
      title: 'Bike Trails',
    });

    map.add(bikeTrailsLineFeatureLayer);

    const trailheadsRenderer = {
      type: 'simple',
      symbol: {
        type: 'picture-marker',
        url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgIRKgEPoZRTpSv_WUnesz_cOKL_K129o81w&usqp=CAU',
        width: '13px',
        height: '13px',
      },
    };

    const bikeTrailsFeatureLayer: __esri.FeatureLayer = new FeatureLayer({
      url: 'https://services7.arcgis.com/BPmbOobL1X8Rtqka/arcgis/rest/services/piste_de_biciclete_bucuresti/FeatureServer/0',
      renderer: trailheadsRenderer,
      title: 'Bike Trails With Symbol',
    });

    map.add(bikeTrailsFeatureLayer);

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

    const layerList = new LayerList({
      view: mapView,
      listItemCreatedFunction: (event) => {
        const item = event.item;
        if (item.layer.type != 'group') {
          item.panel = {
            content: 'legend',
            open: false,
          };
        }
      },
    });

    const layerListExpand = new Expand({
      view: mapView,
      content: layerList,
    });

    mapView.ui.add(layerListExpand, {
      position: 'top-right',
    });

    var basemapGallery = new BasemapGallery({
      view: mapView,
    });

    const bgExpand = new Expand({
      view: mapView,
      content: basemapGallery,
    });

    // Add the expand instance to the ui
    mapView.ui.add(bgExpand, 'top-right');

    mapView.when(() => {
      track.start();
    });
  }

  ngOnInit() {
    this.getGeo();
  }
}
