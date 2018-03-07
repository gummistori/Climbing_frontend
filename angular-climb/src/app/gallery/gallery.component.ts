import { element } from 'protractor';
import { ArticleDetails } from './../articleDetails';

import { Component,  AfterViewInit , Input, HostListener, ElementRef } from '@angular/core';

// import { lightgallery } from './../../../node_modules/angular-lightgallery';

interface FsDocument extends HTMLDocument {
  mozFullScreenElement?: Element;
  msFullscreenElement?: Element;
  msExitFullscreen?: () => void;
  mozCancelFullScreen?: () => void;
}

export function isFullScreen(): boolean {
  const fsDoc = <FsDocument> document;

  return !!(fsDoc.fullscreenElement || fsDoc.mozFullScreenElement || fsDoc.webkitFullscreenElement || fsDoc.msFullscreenElement);
}

interface FsDocumentElement extends HTMLElement {
  msRequestFullscreen?: () => void;
  mozRequestFullScreen?: () => void;
}

export function toggleFullScreen(): void {
  const fsDoc = <FsDocument> document;

  if (!isFullScreen()) {
    const fsDocElem = <FsDocumentElement> document.documentElement;

    if (fsDocElem.requestFullscreen) {
      fsDocElem.requestFullscreen();
    } else if (fsDocElem.msRequestFullscreen) {
      fsDocElem.msRequestFullscreen();
    } else if (fsDocElem.mozRequestFullScreen) {
      fsDocElem.mozRequestFullScreen();
    } else if (fsDocElem.webkitRequestFullscreen) {
      fsDocElem.webkitRequestFullscreen();
    }
  } else if (fsDoc.exitFullscreen) {
    fsDoc.exitFullscreen();
  } else if (fsDoc.msExitFullscreen) {
    fsDoc.msExitFullscreen();
  } else if (fsDoc.mozCancelFullScreen) {
    fsDoc.mozCancelFullScreen();
  } else if (fsDoc.webkitExitFullscreen) {
    fsDoc.webkitExitFullscreen();
  }
}

export function setFullScreen(full: boolean): void {
  if (full !== isFullScreen()) {
    toggleFullScreen();
  }
}

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
      case 27: this.fullExit(); break;
    }
  }

  fullScreen(i) {
    this.FullIndex = i;
    this.Full = true;
    setFullScreen(true);
    document.body.style.overflow = 'hidden';
    // element. webkitRequestFullscreen()
  }

  fullExit() {
    setFullScreen(false);
    this.Full = false;
    document.body.style.overflow = 'scroll';
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
