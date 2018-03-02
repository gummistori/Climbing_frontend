import { ArticleDetails } from './../articleDetails';

import { Component,  AfterViewInit , Input, HostListener } from '@angular/core';

// import { lightgallery } from './../../../node_modules/angular-lightgallery';


declare var lightGallery: any;
declare var $: any;

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})

export class GalleryComponent implements  AfterViewInit  {

  @Input() art: ArticleDetails;

  Full = false;
  FullIndex = 0;

  constructor() {
  }

  ngAfterViewInit() {
    // debugger;
   // $('#lightgallery').lightGallery();
  }

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    switch (event.keyCode) {
      case 39: this.next(); break;
      case 37: this.prev(); break;
      case 27: this.Full = false; break;
    }
  }

  fullScreen(i) {
    this.FullIndex = i;
    this.Full = true;
  }

  fullExit() {
    this.Full = false;
  }
  next() {
    if (this.FullIndex === this.art.myndasida.length - 1) {
      this.FullIndex = 0;
    } else {
      this.FullIndex++;
    }
  }
  prev() {
    if (this.FullIndex === 0) {
      this.FullIndex = this.art.myndasida.length - 1;
    } else {
      this.FullIndex--;
    }
  }

}
