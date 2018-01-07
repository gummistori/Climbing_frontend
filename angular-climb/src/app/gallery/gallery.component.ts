import { ArticleDetails } from './../articleDetails';

import { Component, OnInit, Input } from '@angular/core';

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
