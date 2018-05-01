import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';
import { ArticleDetails, getRandomImage } from '../articleDetails';
import { debug } from 'util';
import { Tag } from './../data.service';

declare var SWMap: any;
declare var google: any;

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css'],
  providers: [DataService]
})

export class ArticleComponent implements OnInit {
  siteWatchMap: any;
  id: number;
  articleDetails: ArticleDetails;
  image = '';
  ready = false;
  isn93Y: number = null;
  isn93X: number = null;
  lat: number = null;
  lon: number = null;
  textColor = 1;
  cssClasses = {'text-white': true
  , 'text-black': false};
  tags: Tag[] = null;

  hasVideo = false;

  constructor(private route: ActivatedRoute, private data: DataService) { }

  ngOnInit() {


    this.route.params.subscribe(params => {
        this.id = +params['id']; // (+) converts string 'id' to a number
        // console.log(this.id);
        this.data.getArticle(this.id).subscribe(data => {

          this.articleDetails = data;
          this.image = 'http://www.climbing.is/headPic.php/' + getRandomImage(data.myndasida);

          this.isn93X = data.x;
          this.isn93Y = data.y;
          this.lat = data.lat;
          this.lon = data.lon;
          this.ready = true;

          if (!document.getElementById('SiteWatchLibrary') && this.isn93X !== null && this.isn93Y !== null) {
            const script = document.createElement('script');
            script.src = 'https://kort.samsyn.is/api/SiteWatch.aspx?key=Klinfyure45&v=2'; // &Compress=False';
            script.id = 'SiteWatchLibrary';
            const me = this;
            script.onload = function() {
              me.map();
              // window.setTimeout(function(){ me.map(); }, 100);
            };
            document.body.appendChild( script );
          }
          if (!document.getElementById('GoogleMapLibrary') && this.lat !== null && this.lon !== null) {
            const script = document.createElement('script');
            script.src = 'https://maps.googleapis.com/maps/api/js?sensor=false';
            script.id = 'SiteWatchLibrary';
            const me = this;
            script.onload = function() {  window.setTimeout(function(){ me.map(); }, 100); };
            document.body.appendChild( script );

          }
          this.map();
          // insert a hit for the article
          this.data.InsertHit(this.id);
        // In a real app: dispatch action to load the details here.


        this.hasVideo = this.articleDetails.videoLink != null;
      });
    });

    this.data.getTags().subscribe(data => {
      for (let i = 0; i < data.length; i++) {
        data[i].checked = false;
      }
      this.tags = data;
    });
  }

  textClass() {
    if (this.textColor % 2 === 1) {
      this.cssClasses = {'text-white': false
      , 'text-black': true};
    } else {
      this.cssClasses = {'text-white': true
      , 'text-black': false};
    }
    this.textColor += 1;
  }

  getTag(tagId: number) {

    return this.data.getTagName(tagId);
  }
  map() {
    if (!this.ready) {

      return;
    }

    if (this.isn93X !== null && this.isn93Y !== null) {
      try {
        if (!SWMap) {
          return;
        }
      } catch (Exception) {
        return;
      }


      this.siteWatchMap = SWMap.create('map',
        { panButton: false, zoomButton: false, defaultZoom: 1, defaultCenterPoint: { x: this.isn93X, y: this.isn93Y} });
      this.siteWatchMap.addMarker('svaedi', { x: this.isn93X, y: this.isn93Y },
          '',
          'https://new.climbing.is/img/poi.png');
      this.siteWatchMap.setDataset(1);
    }

    if (this.lon !== null && this.lat !== null) {
      try {
        if (!google) {
          return;
        }
      } catch (Exception) {
        return;
      }
      const mapOptions = {
        zoom: 5,
        disableDefaultUI: true,
        mapTypeId: google.maps.MapTypeId.TERRAIN,
        center: new google.maps.LatLng(this.lat, this.lon),
        styles: [
          {'featureType': 'all',
          'elementType': 'all',
          'stylers': [{'saturation': '20'}]},
          {'featureType': 'administrative',
          'elementType': 'labels',
          'stylers': [{'visibility': 'on'}]},
          {'featureType': 'administrative.province',
          'elementType': 'all',
          'stylers': [{'visibility': 'off'}]},
          {'featureType': 'administrative.province',
          'elementType': 'labels',
          'stylers': [{'visibility': 'off'}]},
          {'featureType': 'administrative.locality',
          'elementType': 'all', 'stylers': [{'visibility': 'on'}]},
          {'featureType': 'administrative.neighborhood', 'elementType': 'all', 'stylers': [{'visibility': 'off'}]},
          {'featureType': 'administrative.land_parcel', 'elementType': 'all', 'stylers': [{'visibility': 'off'}]},
          {'featureType': 'landscape', 'elementType': 'all', 'stylers': [{'saturation': '-47'},
          {'lightness': '0'},
          {'hue': '#00ffcd'}]},
          {'featureType': 'landscape.man_made', 'elementType': 'all', 'stylers': [{'visibility': 'off'}]},
          {'featureType': 'landscape.natural.terrain', 'elementType': 'all', 'stylers': [{'lightness': '0'}]},
          {'featureType': 'poi', 'elementType': 'all', 'stylers': [{'lightness': '0'}, {'visibility': 'off'}, {'saturation': '-82'}]},
          {'featureType': 'road', 'elementType': 'labels', 'stylers': [{'visibility': 'off'}]},
          {'featureType': 'road.highway.controlled_access', 'elementType': 'all', 'stylers': [{'visibility': 'on'}]},
          {'featureType': 'road.highway.controlled_access', 'elementType': 'labels', 'stylers': [{'visibility': 'off'}]},
          {'featureType': 'transit', 'elementType': 'all', 'stylers': [{'visibility': 'off'}]},
          {'featureType': 'water', 'elementType': 'all', 'stylers': [{'saturation': '-82'}, {'lightness': '-60'}, {'hue': '#009eff'}]},
          {'featureType': 'water', 'elementType': 'labels', 'stylers': [{'visibility': 'off'}]}]};
      const mapElement = document.getElementById('map');
      const map = new google.maps.Map(mapElement, mapOptions);
      const marker = new google.maps.Marker(
      {
        position: new google.maps.LatLng(this.lat, this.lon),
        map: map,
        icon: 'http://new.climbing.is/img/poi.png',
        title: 'Climbing.is'
      });
    }
  }

}
