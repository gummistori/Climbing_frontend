import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { squareThumbUrl } from '../core/image-url';
import { ArticleDetails, GalleryItem } from '../core/models';

@Component({
  selector: 'app-gallery',
  imports: [RouterLink],
  templateUrl: './gallery.component.html',
})
export class GalleryComponent {
  @Input({ required: true }) article!: ArticleDetails;

  thumbUrl(image: GalleryItem): string {
    return squareThumbUrl(image.file);
  }
}
