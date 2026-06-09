import { Component, computed, input, inject } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

import { ArticleDetails } from '../core/models';

@Component({
  selector: 'app-article-video',
  templateUrl: './article-video.component.html',
})
export class ArticleVideoComponent {
  private readonly sanitizer = inject(DomSanitizer);

  readonly article = input.required<ArticleDetails>();
  readonly videoUrl = computed(() => this.trustedVideoUrl(this.article().videoLink));

  private trustedVideoUrl(value: string | null): SafeResourceUrl | null {
    if (!value) {
      return null;
    }

    try {
      const url = new URL(value);
      const allowedHosts = new Set([
        'player.vimeo.com',
        'www.youtube.com',
        'youtube.com',
        'www.youtube-nocookie.com',
      ]);

      if (url.protocol === 'https:' && allowedHosts.has(url.hostname)) {
        return this.sanitizer.bypassSecurityTrustResourceUrl(url.toString());
      }
    } catch {
      return null;
    }

    return null;
  }
}
