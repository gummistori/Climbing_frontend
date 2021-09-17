import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';
import { ArticleDetails, getRandomImage } from '../Models/articleDetails';
import { Tag } from './../data.service';

declare var SWMap: any;
declare var Microsoft: any;

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
  cssClasses = {'text-white': true, 'text-black': false};
  tags: Tag[] = null;

  hasVideo = false;

  constructor(private route: ActivatedRoute, private data: DataService, private title: Title) { }

  ngOnInit() {


    this.route.params.subscribe(params => {
        // tslint:disable-next-line:no-string-literal
        this.id = +params['id']; // + converts string 'id' to a number
        // console.log(this.id);
        this.data.getArticle(this.id).subscribe(data => {

          this.articleDetails = data;
          this.title.setTitle(data.title + ' - Fjallateymið');
          this.image = 'https://data.climbing.is/headPic.php/' + getRandomImage(data.myndasida);

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
            // tslint:disable-next-line:only-arrow-functions
            script.onload = function() {
              me.map();
              // window.setTimeout(function(){ me.map(); }, 100);
            };
            document.body.appendChild( script );
          }
          if (!document.getElementById('GoogleMapLibrary') && this.lat !== null && this.lon !== null) {
            const script = document.createElement('script');
            script.src = 'https://www.bing.com/api/maps/mapcontrol?key=AvqjeaC_aQhAJre-FOfeoQcF-AHsJz5WaAJP2CYtDuAlO7z7Bx_sr_ZrpyZXieRK';
            script.id = 'BingMaps';
            const me = this;
            // tslint:disable-next-line:only-arrow-functions
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
      // tslint:disable-next-line:prefer-for-of
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
        if (!Microsoft) {
          return;
        }
      } catch (Exception) {
        return;
      }
      const map = new Microsoft.Maps.Map(document.getElementById('map'), {
        center: new Microsoft.Maps.Location(this.lat, this.lon)
        , mapTypeId: Microsoft.Maps.MapTypeId.aerial
        , zoom: 5
        });
        /*
        const pushpin = new Microsoft.Maps.Pushpin(map.getCenter(), { color: 'red' });
        map.entities.push(pushpin);
        // new google.maps.Map(mapElement, mapOptions);
        */
    }
  }

}
