import { ArticleDetails } from './../Models/articleDetails';

import { Component,  AfterViewInit , Input, HostListener, ElementRef } from '@angular/core';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})

export class GalleryComponent  {

  @Input() art: ArticleDetails;
  @Input() id;

  constructor() { }

}
