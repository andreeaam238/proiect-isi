import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { Platform } from '@ionic/angular';
import { loadModules, setDefaultOptions } from 'esri-loader';

import esri = __esri;
import { Point } from 'esri/geometry'; // Esri TypeScript Types

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements AfterViewInit {
  @ViewChild('map', { static: true }) mapEl: ElementRef;
  @Output() mapLoadedEvent = new EventEmitter<boolean>();

  mapView: any = null;
  track: any = null;

  // register Dojo AMD dependencies
  _Map;
  _MapView;
  _FeatureLayer;
  _Graphic;
  _GraphicsLayer;
  _Route;
  _RouteParameters;
  _FeatureSet;
  _Point;
  _locator;
  _Compass;
  _Locate;
  _Track;
  _LayerList;
  _BasemapGallery;
  _Expand;
  _Legend;

  constructor(public platform: Platform) {}

  async getGeo() {
    await this.platform.ready();
    setDefaultOptions({ css: true });

    const [
      esriConfig,
      Map,
      MapView,
      Compass,
      Track,
      Graphic,
      GraphicsLayer,
      FeatureLayer,
      LayerList,
      BasemapGallery,
      Expand,
      route,
      RouteParameters,
      FeatureSet,
      Legend,
      locator,
    ]: any = await loadModules([
      'esri/config',
      'esri/Map',
      'esri/views/MapView',
      'esri/widgets/Compass',
      'esri/widgets/Track',
      'esri/Graphic',
      'esri/layers/GraphicsLayer',
      'esri/layers/FeatureLayer',
      'esri/widgets/LayerList',
      'esri/widgets/BasemapGallery',
      'esri/widgets/Expand',
      'esri/rest/route',
      'esri/rest/support/RouteParameters',
      'esri/rest/support/FeatureSet',
      'esri/widgets/Legend',
      'esri/rest/locator',
    ]).catch((err) => {
      console.error('ArcGIS: ', err);
    });

    this._Map = Map;
    this._MapView = MapView;
    this._FeatureLayer = FeatureLayer;
    this._Graphic = Graphic;
    this._RouteParameters = RouteParameters;
    this._Compass = Compass;
    this._Track = Track;
    this._LayerList = LayerList;
    this._BasemapGallery = BasemapGallery;
    this._Expand = Expand;
    this._Route = route;
    this._RouteParameters = RouteParameters;
    this._FeatureSet = FeatureSet;
    this._Legend = Legend;
    this._locator = locator;

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

    // Create a line geometry
    var simpleLineSymbol = {
      type: 'simple-line',
      color: 'red',
      width: 3,
    };

    var graphicsLayer = new GraphicsLayer({
      title: 'DNCB',
    });
    map.add(graphicsLayer);

    var polyline = {
      type: 'polyline',
      paths: [
        [25.9528945, 44.4661265],
        [25.952617, 44.4651227],
        [25.9527358, 44.4645901],
        [25.953112, 44.463445],
        [25.9546356, 44.4596927],
        [25.956674, 44.4555117],
        [25.9586696, 44.4548224],
        [25.9610513, 44.4531835],
        [25.9650425, 44.4499668],
        [25.9659008, 44.4469032],
        [25.9665231, 44.4396106],
        [25.9675744, 44.432318],
        [25.9670809, 44.4308163],
        [25.9674028, 44.42815],
        [25.967789, 44.423369],
        [25.9710381, 44.415259],
        [25.9854576, 44.3897494],
        [25.9897495, 44.3855172],
        [25.9961007, 44.3816527],
        [26.0061549, 44.374805],
        [26.0174939, 44.3665451],
        [26.0210024, 44.3650035],
        [26.0252402, 44.3629401],
        [26.0314416, 44.3608846],
        [26.037986, 44.3590741],
        [26.0553255, 44.3530609],
        [26.0716316, 44.3479044],
        [26.082662, 44.343424],
        [26.0954068, 44.3373464],
        [26.0971663, 44.3366712],
        [26.0997842, 44.336487],
        [26.1022732, 44.3371623],
        [26.104934, 44.3372236],
        [26.1111138, 44.3350135],
        [26.1331723, 44.3352591],
        [26.1450595, 44.33704],
        [26.1514325, 44.3380988],
        [26.1561749, 44.3394029],
        [26.1742852, 44.3450809],
        [26.1842415, 44.3507277],
        [26.2070976, 44.362742],
        [26.2148224, 44.3726052],
        [26.2153374, 44.3758568],
        [26.2158953, 44.3767618],
        [26.2168824, 44.3776667],
        [26.2176763, 44.3782187],
        [26.2190281, 44.3786174],
        [26.2221824, 44.3788168],
        [26.2239848, 44.3792386],
        [26.2257014, 44.3798751],
        [26.227182, 44.3823594],
        [26.2274898, 44.3829062],
        [26.2276259, 44.3836984],
        [26.2275903, 44.3844829],
        [26.2275403, 44.3848522],
        [26.2273616, 44.3852827],
        [26.2262084, 44.3879469],
        [26.225098, 44.3906724],
        [26.2238749, 44.3935052],
        [26.2227482, 44.396338],
        [26.2225926, 44.3967558],
        [26.2225336, 44.3971046],
        [26.2226141, 44.3976872],
        [26.2230191, 44.3983503],
        [26.2235421, 44.3990133],
        [26.224336, 44.3996803],
        [26.2255806, 44.4001402],
        [26.2296147, 44.4014893],
        [26.2304622, 44.4020565],
        [26.2311381, 44.4027464],
        [26.231975, 44.4040034],
        [26.2330479, 44.4054137],
        [26.2354511, 44.412281],
        [26.236009, 44.4154076],
        [26.2357086, 44.4187487],
        [26.236009, 44.4203734],
        [26.2363952, 44.4223351],
        [26.2363095, 44.4240208],
        [26.2356229, 44.4258137],
        [26.2352367, 44.4276373],
        [26.2348933, 44.4297518],
        [26.2351079, 44.4324485],
        [26.2351078, 44.4375356],
        [26.2356932, 44.4436629],
        [26.2356779, 44.4490549],
        [26.2357331, 44.4605742],
        [26.2325576, 44.468139],
        [26.2310983, 44.4734374],
        [26.2301409, 44.4744523],
        [26.2292265, 44.4752528],
        [26.2273383, 44.4771206],
        [26.2260079, 44.4791416],
        [26.2247204, 44.4804889],
        [26.2152805, 44.489008],
        [26.2052367, 44.4978936],
        [26.193909, 44.507619],
        [26.1822341, 44.5172209],
        [26.1620667, 44.5274413],
        [26.1454127, 44.5350276],
        [26.1248992, 44.5385148],
        [26.1211656, 44.539188],
        [26.116917, 44.5393717],
        [26.1070464, 44.5394937],
        [26.0987207, 44.5394942],
        [26.0938229, 44.5388022],
        [26.0886678, 44.5382018],
        [26.0845373, 44.5379795],
        [26.0768767, 44.5366797],
        [26.0688518, 44.5347828],
        [26.0534443, 44.5307759],
        [26.0479728, 44.5293685],
        [26.04233, 44.5270734],
        [26.0163877, 44.5163335],
        [26.0129759, 44.5150024],
        [26.0115168, 44.5142832],
        [26.0102294, 44.5133039],
        [26.0061092, 44.5078257],
        [26.0027193, 44.5024085],
        [26.0011258, 44.5007518],
        [25.9991033, 44.499493],
        [25.9954287, 44.497599],
        [25.9920548, 44.4955212],
        [25.9885111, 44.4929383],
        [25.9859976, 44.4913349],
        [25.9828591, 44.4892302],
        [25.9745238, 44.4838264],
        [25.9731129, 44.483015],
        [25.9722171, 44.4821117],
        [25.9714982, 44.4809482],
        [25.9708009, 44.4797693],
        [25.9704308, 44.4789656],
        [25.9697173, 44.4782843],
        [25.9656719, 44.4754747],
        [25.9618414, 44.4728794],
        [25.9571317, 44.4691968],
        [25.955013, 44.4677842],
        [25.9528945, 44.4661265],
      ],
    };

    var polylineGraphic = new Graphic({
      geometry: polyline,
      symbol: simpleLineSymbol,
    });

    graphicsLayer.add(polylineGraphic);

    this.mapView = new MapView({
      container: this.mapEl.nativeElement,
      center: [26.096306, 44.439663],
      zoom: 10,
      map: map,
    });

    await this.mapView.when(); // wait for map to load
    console.log('ArcGIS map loaded');
    this.addRouter();

    let compassWidget = new Compass({
      view: this.mapView,
    });

    this.mapView.ui.add(compassWidget, 'top-left');

    this.track = new Track({
      view: this.mapView,
      scale: 5000,
    });

    this.mapView.ui.add(this.track, 'top-left');
    this.track.container.addEventListener('click', () => {
      setTimeout(() => {
        if (!this.track.tracking) {
          this.mapView.graphics.removeAll();
          this.mapView.ui.empty('bottom-right');
        }
      }, 50);
    });

    const layerList = new LayerList({
      view: this.mapView,
      listItemCreatedFunction: (event) => {
        const item = event.item;
        if (item.layer.type != 'graphics') {
          item.panel = {
            content: 'legend',
            open: true,
          };
        }
      },
    });

    const layerListExpand = new Expand({
      view: this.mapView,
      content: layerList,
    });

    this.mapView.ui.add(layerListExpand, {
      position: 'top-right',
    });

    var basemapGallery = new BasemapGallery({
      view: this.mapView,
    });

    const bgExpand = new Expand({
      view: this.mapView,
      content: basemapGallery,
    });

    // Add the expand instance to the ui
    this.mapView.ui.add(bgExpand, 'top-right');

    const places = [
      'Choose a place type...',
      'Parks and Outdoors',
      'Parking',
      'Gas station',
      'Sporting Goods Store',
    ];

    const select = document.createElement('select');
    select.setAttribute('class', 'esri-widget esri-select');
    select.setAttribute(
      'style',
      "width: 175px; font-family: 'Avenir Next W00'; font-size: 1em"
    );

    places.forEach((p) => {
      const option = document.createElement('option');
      option.value = p;
      option.innerHTML = p;
      select.appendChild(option);
    });

    const selectExpand = new Expand({
      view: this.mapView,
      content: select,
    });

    this.mapView.ui.add(selectExpand, 'top-right');

    // Add event signaling

    this.mapView.ui.add(bgExpand, 'top-right');

    const trafficEvents = [
      'Choose a traffic event...',
      'car parked illegally',
      'pothole',
      'runway under construction',
    ];

    const selectForTrafficEvents = document.createElement('select');
    selectForTrafficEvents.setAttribute('class', 'esri-widget esri-select');
    selectForTrafficEvents.setAttribute(
      'style',
      "width: 175px; font-family: 'Avenir Next W00'; font-size: 1em"
    );

    trafficEvents.forEach((p) => {
      const option = document.createElement('option');
      option.value = p;
      option.innerHTML = p;
      selectForTrafficEvents.appendChild(option);
    });

    const selectExpandTrafficEvents = new Expand({
      view: this.mapView,
      content: selectForTrafficEvents,
    });

    this.mapView.ui.add(selectExpandTrafficEvents, 'top-right');
    // End event signaling

    // Listen for traffic events changing
    selectForTrafficEvents.addEventListener('change', async (event) => {
      console.log((<HTMLSelectElement>event.target).value);
      navigator.geolocation.getCurrentPosition((pos) => {
        console.log(pos.coords.latitude, pos.coords.longitude);
      });
    });

    // Search for places in center of map
    this.mapView.watch('stationary', (val) => {
      if (val) {
        this.findPlaces(select.value, this.mapView.center);
      }
    });

    // Listen for category changes and find places
    select.addEventListener('change', (event) => {
      this.findPlaces(
        (<HTMLSelectElement>event.target).value,
        this.mapView.center
      );
    });
  }

  addRouter() {
    const routeUrl =
      'https://route-api.arcgis.com/arcgis/rest/services/World/Route/NAServer/Route_World';

    this.mapView.on('click', (event) => {
      if (this.track.tracking) {
        if (this.mapView.graphics.length === 0) {
          addGraphic('origin', event.mapPoint);
        } else if (this.mapView.graphics.length === 1) {
          addGraphic('destination', event.mapPoint);
          getRoute();
        } else if (this.mapView.graphics.length === 4) {
          this.mapView.graphics = this.mapView.graphics.slice(3);
          addGraphic('destination', event.mapPoint);
          getRoute();
        } else {
          this.mapView.graphics = this.mapView.graphics.slice(0, -2);
          addGraphic('destination', event.mapPoint);
          getRoute();
        }
      } else {
        if (this.mapView.graphics.length === 0) {
          addGraphic('origin', event.mapPoint);
        } else if (this.mapView.graphics.length === 1) {
          addGraphic('destination', event.mapPoint);
          getRoute();
        } else {
          this.mapView.graphics.removeAll();
          addGraphic('origin', event.mapPoint);
        }
      }
    });

    var addGraphic = (type: any, point: any) => {
      const graphic = new this._Graphic({
        symbol: {
          type: 'simple-marker',
          color: type === 'origin' ? 'white' : 'black',
          size: '8px',
        } as any,
        geometry: point,
      });
      this.mapView.graphics.add(graphic);
    };

    var getRoute = () => {
      const routeParams = new this._RouteParameters({
        stops: new this._FeatureSet({
          features: this.mapView.graphics.toArray(),
        }),
        returnDirections: true,
      });

      this._Route
        .solve(routeUrl, routeParams)
        .then((data: any) => {
          for (let result of data.routeResults) {
            result.route.symbol = {
              type: 'simple-line',
              color: [5, 150, 255],
              width: 3,
            };
            this.mapView.graphics.add(result.route);
          }

          // Display directions
          if (data.routeResults.length > 0) {
            const container: any = document.createElement('div');
            const directions: any = document.createElement('ol');
            const close: any = document.createElement('button');
            close.innerHTML = 'X';
            close.style.margin = '8px 16px 0';
            close.style.background = 'transparent';
            close.style.color = 'black';

            close.addEventListener('click', () => {
              this.mapView.ui.empty('bottom-right');
              if (this.mapView.graphics.getItemAt(0).symbol.color === null) {
                this.mapView.graphics = this.mapView.graphics.slice(0, 1);
              } else {
                this.mapView.graphics.removeAll();
              }
            });
            container.appendChild(close);
            container.appendChild(directions);
            container.classList =
              'esri-widget esri-widget--panel esri-directions__scroller';
            directions.classList =
              'esri-widget esri-widget--panel esri-directions__scroller';
            directions.style.marginTop = '0';
            directions.style.padding = '15px 15px 15px 30px';
            const features = data.routeResults[0].directions.features;

            // Show each direction
            features.forEach((result: any, i: any) => {
              const direction = document.createElement('li');
              direction.innerHTML =
                result.attributes.text +
                ' (' +
                result.attributes.length * 1.609344 +
                ' km)';
              directions.appendChild(direction);
            });

            this.mapView.ui.empty('bottom-right');
            this.mapView.ui.add(container, 'bottom-right');
          }
        })
        .catch((error: any) => {
          console.log(error);
        });
    };
  }

  ngAfterViewInit() {
    this.getGeo();
  }

  findPlaces(category: string, pt: Point) {
    if (category === 'Choose a place type...') {
      this.mapView.graphics = this.mapView.graphics.filter(
        (graphic) =>
          graphic.symbol.color === null ||
          graphic.symbol.color.toHex() == '#ffffff' ||
          graphic.symbol.color.toHex() == '#000000' ||
          graphic.symbol.color.toHex() == '#0596ff'
      );
      return;
    } else {
      this.track.stop();
    }

    const geocodingServiceUrl =
      'http://geocode-api.arcgis.com/arcgis/rest/services/World/GeocodeServer';

    const params = {
      location: pt,
      categories: [category],
      maxLocations: 25,
      outFields: ['Place_addr', 'PlaceName'],
    };

    const showResults = (results) => {
      this.mapView.popup.close();
      this.mapView.graphics.removeAll();
      results.forEach((result) => {
        this.mapView.graphics.add(
          new this._Graphic({
            attributes: result.attributes,
            geometry: result.location,
            symbol: {
              type: 'simple-marker',
              color: '#5C0404',
              size: '10px',
              outline: {
                color: '#5C0404',
                width: '2px',
              },
            },
            popupTemplate: {
              title: '{PlaceName}',
              content:
                '{Place_addr}' +
                '<br><br>' +
                result.location.x.toFixed(5) +
                ',' +
                result.location.y.toFixed(5),
            },
          })
        );
      });

      if (results.length) {
        const g = this.mapView.graphics.getItemAt(0);
        this.mapView.popup.open({
          features: [g],
          location: g.geometry,
        });
      }
    };

    this._locator
      .addressToLocations(geocodingServiceUrl, params)
      .then((results) => {
        showResults(results);
      })
      .catch((err) => console.warn(err));
  }
}
