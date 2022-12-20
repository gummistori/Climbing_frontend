import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { DataService } from '../data.service';
import { SwLocation } from '../Models/swLocation';

declare var SWMap: any;
declare var SiteWatch_API: any;

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent implements AfterViewInit, OnDestroy {
  siteWatchMap: any;
  showMap = false;
  currPos: SwLocation;
  mapType = 1;
  stillHere = true;
  firstView = true;
  constructor(private service: DataService, private title: Title) { }

  ngAfterViewInit(): void {
    this.title.setTitle("Fjallateymið - staðsetning");
    this.stillHere = true;
    this.updatePos();
  }

  ngOnDestroy(): void {
    this.stillHere = false;
    // console.log('leaving');
  }

  updatePos(): void {
    if (!this.stillHere) {
      return;
    }
    this.service.getMapEnabled().subscribe(res => {
      if (res) {
        this.service.getLocation().subscribe(loc => {
          this.currPos= loc;
          // console.log(this.currPos);
          this.initMap();
          window.setTimeout(() => {
            this.updatePos();
          }, 5000);
        });
    }
    });
  }

  initMap() {
    if (!document.getElementById('SiteWatchLibrary')) {
      // console.log('SiteWatchLibrary not found');
      const script = document.createElement('script');
      script.src = 'https://kort.samsyn.is/api/SiteWatch.aspx?key=Klinfyure45&v=2'; // &Compress=False';
      script.id = 'SiteWatchLibrary';
      const me = this;
      // tslint:disable-next-line:only-arrow-functions
      script.onload = function() {
        // me.map();
        // tslint:disable-next-line:only-arrow-functions
        window.setTimeout(function() { me.map(); }, 800);
      };
      document.body.appendChild( script );
    } else {
      // console.log('SiteWatchLibrary OK');
      this.map();
    }
  }

  map() {    
    this.showMap = true;
    if ((typeof SiteWatch_API) === 'undefined' || this.siteWatchMap) {
      // console.log('clearing!');
      // SiteWatch_API = {};
      // this.siteWatchMap = {};
      this.recreateMap();
      return;
    }
    // tslint:disable-next-line:variable-name
    let swId: number;
    swId = parseInt(SiteWatch_API.getNewID().substr('SiteWatch_'.length), 10);

    this.siteWatchMap = SWMap.create('map',
      {
        panButton: false
        , zoomButton: false
        , defaultZoom: 2
        , defaultCenterPoint: {x: this.currPos.isn93X, y: this.currPos.isn93Y}
      });
    this.recreateMap();

    /*this.siteWatchMap.addMarker('neighbour', {x: this.currentSite.x + 10000, y: this.currentSite.y + 10000}, 'Granni',
      {url: 'https://kerfi.112.is/img/sendir_yellow.png', css: 'SiteWatchIcon'});
    */
    this.siteWatchMap.setDataset(this.mapType);

    document.getElementById('SiteWatch_' + (swId + 9)).style.zIndex = '999';
    document.getElementById('SiteWatch_' + (swId + 5)).style.visibility = 'hidden';
    document.getElementById('SiteWatch_' + (swId + 6)).style.backgroundColor = 'rgb(1,1,1,0)';
    document.getElementById('SiteWatch_' + (swId + 6)).style.border = '';

    // TODO: fix the sitewatch DIV element z-index
    document.getElementById('SiteWatch_' + (swId + 9)).style.zIndex = '999';
  }
  
  recreateMap() {
    if (this.siteWatchMap) {
      if (this.firstView){
        this.siteWatchMap.setCenter({x: this.currPos.isn93X, y: this.currPos.isn93Y});
        this.firstView = false;
      }
      this.siteWatchMap.removeAllDivMarkers();
      this.siteWatchMap.addMarker('logo', {x: this.currPos.isn93X, y: this.currPos.isn93Y}
        , {text: 'Fjallateymið', fgColor: 'black'}, {url: '/assets/climbing_maplogo.png', css: 'SiteWatchIcon'});
    }
  }

  mapToggle() {
    if (this.siteWatchMap) {
      this.siteWatchMap.setDataset(++this.mapType % 4);
    }
  }
}
