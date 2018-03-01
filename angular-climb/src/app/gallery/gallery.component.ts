import { ArticleDetails } from './../articleDetails';

import { Component, OnInit, Input } from '@angular/core';

//import { lightgallery } from './../../../node_modules/angular-lightgallery';


@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})

export class GalleryComponent implements OnInit {

  @Input() art: ArticleDetails;

  constructor() { }

  ngOnInit() {
  }

}
