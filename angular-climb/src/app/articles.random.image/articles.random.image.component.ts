import { Component, OnInit, Input } from '@angular/core';
import { GalleryItem } from '../galleryItem';
import { getRandomImage } from '../articleDetails';

@Component({
  selector: 'app-articles-random-image',
  templateUrl: './articles.random.image.component.html',
  styleUrls: ['./articles.random.image.component.css']
})
export class ArticlesRandomImageComponent implements OnInit {
  @Input() set GalleryItems(GalleryItems: GalleryItem[]) {
    if (GalleryItems === null || GalleryItems.length === 0) {
      this.image = null;
      return;
    }

    const image = getRandomImage(GalleryItems);
    if (image === null) {
      const rnd =  Math.floor(Math.random() * Math.floor(GalleryItems.length));
      this.image = GalleryItems[rnd].file;
      return;
    }

    this.image = image;
  }
  constructor() { }

  public image: string = null;

  ngOnInit() {
  }

}
