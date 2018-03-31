import { ArticleDetails } from './../articleDetails';
import { Component, OnInit, AfterViewInit , Input, HostListener, ElementRef } from '@angular/core';
import { PlatformLocation, Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';

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

@Component({
  selector: 'app-gallery.image',
  templateUrl: './gallery.image.component.html',
  styleUrls: ['./gallery.image.component.css']
})
export class GalleryImageComponent implements OnInit {



  constructor(private location: Location, private route: ActivatedRoute, private data: DataService, platFromLocation: PlatformLocation) {
    platFromLocation.onPopState(() => {
      this.fullExit();
    });
  }

  touchstartObject: {x: number, y: number} = null;
  Full = false;
  FullIndex = 0;
  FullIndexOld = 0;
  FullIndex1 = 0;
  FullIndexMinus1 = 0;
  FullIndex2 = 0;
  FullIndexMinus2 = 0;
  art: ArticleDetails;

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id =  +params['id'];
      this.data.getArticle(id).subscribe(data => {
          this.art = data;
          this.fullScreen(+params['image']);
        });
    });
  }

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    switch (event.keyCode) {
      case 39: this.next(); break;
      case 37: this.prev(); break;
      case 27: this.fullExit(); break;
    }
  }

  back() {
    this.location.back();
  }

  touchstart(event) {
    // console.log('touchStart', event);
    if (this.touchstartObject == null) {
      this.touchstartObject = { x: event.touches[0].clientX,  y: event.touches[0].clientY };
    }

    event.preventDefault();
    return true;
  }

  touchmove(event) {
  //  console.log('touchmove');
    if (this.touchstartObject != null) {
      const diffX = this.touchstartObject.x - event.touches[0].clientX;
      if (diffX > 100) {
        this.touchstartObject = null;
        this.next();
      }

      if (diffX < -100) {
        this.touchstartObject = null;
        this.prev();
      }
    }
    event.preventDefault();
    return true;
  }

  touchend(event) {
//    console.log('touchend');
    event.preventDefault();
    return true;
  }

  fullScreen(i) {
    this.FullIndex = i;
    this.FullIndexOld = i;
    this.FullIndex1 = this.nextValue(i);
    this.FullIndexMinus1 = this.prevValue(i);
    this.FullIndex2 = this.nextValue(i, 2);
    this.FullIndexMinus2 = this.prevValue(i, 2);
    this.Full = true;
    setFullScreen(true);
// document.body.style.overflow = 'hidden';
    // element. webkitRequestFullscreen()
  }

  fullExit() {
    setFullScreen(false);
    this.Full = false;
  //  document.body.style.overflow = 'scrollY';
  }
  nextValue(value, i = 1) {
    return (value + 1 * i) % this.art.myndasida.length;
  }
  prevValue(value, i = 1) {
    return (value - 1 * i) % this.art.myndasida.length;
  }
  next() {
    this.FullIndexOld = this.FullIndex;
    setTimeout(() => { document.getElementById('newImage').className = 'image'; }, 500);
    document.getElementById('newImage').className = 'image nextShow';

    setTimeout(() => { document.getElementById('oldImage').className = 'hide'; }, 500);
    document.getElementById('oldImage').className = 'image nextHide';

    this.FullIndex = this.nextValue(this.FullIndex);
    this.FullIndex1 = this.nextValue(this.FullIndex1);
    this.FullIndexMinus1 = this.nextValue(this.FullIndexMinus1);
    this.FullIndex2 = this.nextValue(this.FullIndex2);
    this.FullIndexMinus2 = this.nextValue(this.FullIndexMinus2);
  }
  prev() {
    this.FullIndexOld = this.FullIndex;
    setTimeout(() => { document.getElementById('newImage').className = 'image'; }, 500);
    document.getElementById('newImage').className = 'image prevShow';

    setTimeout(() => { document.getElementById('oldImage').className = 'hide'; }, 500);
    document.getElementById('oldImage').className = 'image prevHide';
    this.FullIndex = this.prevValue(this.FullIndex);
    this.FullIndex1 = this.prevValue(this.FullIndex1);
    this.FullIndexMinus1 = this.prevValue(this.FullIndexMinus1);
    this.FullIndex2 = this.prevValue(this.FullIndex2);
    this.FullIndexMinus2 = this.prevValue(this.FullIndexMinus2);
  }


}
