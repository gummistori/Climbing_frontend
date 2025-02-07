import { ArticleDetails } from './../Models/articleDetails';
import { Component,  AfterViewInit , Input, HostListener, ElementRef } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-articlevideo',
  templateUrl: './article.video.component.html',
  styleUrls: ['./article.video.component.css']
})
export class ArticleVideoComponent {
  vimeoUrl = 'https://vimeo.com/197933516';
  url: SafeResourceUrl = "";
  private _art:ArticleDetails;
  @Input()
  set art(value: ArticleDetails) {
    this._art = value;
    if (value) {
      this.url = this.santizer.bypassSecurityTrustResourceUrl(value.videoLink);
    }
  }
  get art():ArticleDetails {
    return this._art;
  }
  constructor(private santizer: DomSanitizer) {
   // this.url = this.santizer.bypassSecurityTrustResourceUrl("https://player.vimeo.com/video/547276237");
  }
}
