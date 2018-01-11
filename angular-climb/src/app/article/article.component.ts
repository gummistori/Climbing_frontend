import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';
import { ArticleDetails, getRandomImage } from '../articleDetails';
import { debug } from 'util';

//declare var swMap: any;

//import 'http://kort.samsyn.is/api/SiteWatch.aspx?key=Klinfyure45&v=2';

declare var SWMap:any;

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css'],
  providers: [DataService]
})

export class ArticleComponent implements OnInit {
  siteWatchMap:any;
  id: number;
  articleDetails: ArticleDetails;
  image: string = "";
  ready: boolean = false;
  isn93Y:number;
  isn93X:number;
  constructor(private route: ActivatedRoute, private data: DataService) { }

  ngOnInit() {


    this.route.params.subscribe(params => {
        this.id = +params['id']; // (+) converts string 'id' to a number
        console.log(this.id);
        this.data.getArticle(this.id).subscribe(data => {
        this.articleDetails = data; 
        this.image = "http://www.climbing.is/headPic.php/"+getRandomImage(data.gallery);
        console.log(data);
        this.isn93X = data.x;
        this.isn93Y = data.y;
        this.ready = true;
        if (!document.getElementById("SiteWatchLibrary") && this.isn93X !==undefined && this.isn93Y !== undefined){
          var script = document.createElement("script");
          script.src = "https://kort.samsyn.is/api/SiteWatch.aspx?key=Klinfyure45&v=2&Compress=False";
          script.id = "SiteWatchLibrary";
          var me = this;
          script.onload = function() {  window.setTimeout(function(){ me.map();}, 100);};
          document.body.appendChild( script );
        } 
        this.map();        
      // In a real app: dispatch action to load the details here.
   });
  });

   //this.map();
  }

  map(){
   
    if (!this.ready){
      return;
    }
    if (this.isn93X !== undefined && this.isn93Y !== undefined) {
      try {
        if (!SWMap){
          return;
        }
      } catch(Exception) {
        return;
      }
 console.log("dfs");
    //return;
    debugger;
      this.siteWatchMap = SWMap.create("map", { panButton: false, zoomButton: false, defaultZoom: 1, defaultCenterPoint: { x: this.isn93X, y: this.isn93Y} });
        var marker = this.siteWatchMap.addMarker('svaedi', { x: this.isn93X, y: this.isn93Y }, 
          '',
          'http://new.climbing.is/img/poi.png');
    
      this.siteWatchMap.setDataset(1);
    }
  }

}
