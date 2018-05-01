import { ArticleDetails } from './../articleDetails';
import { Component,  AfterViewInit , Input, HostListener, ElementRef } from '@angular/core';

import { HttpModule } from '@angular/http';

@Component({
  selector: 'app-articlevideo',
  templateUrl: './article.video.component.html',
  styleUrls: ['./article.video.component.css']
})
export class ArticleVideoComponent {
  vimeoUrl = 'https://vimeo.com/197933516';

  @Input() art: ArticleDetails;

  constructor() {
  }
}
