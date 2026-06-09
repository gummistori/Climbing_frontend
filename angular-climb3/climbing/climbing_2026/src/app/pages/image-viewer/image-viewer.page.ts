import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Component, HostListener, PLATFORM_ID, computed, effect, inject, signal } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { toSignal } from '@angular/core/rxjs-interop';

import { ClimbingDataService } from '../../core/climbing-data.service';
import { fullImageUrl } from '../../core/image-url';

@Component({
  selector: 'app-image-viewer-page',
  templateUrl: './image-viewer.page.html',
})
export class ImageViewerPage {
  private readonly data = inject(ClimbingDataService);
  private readonly document = inject(DOCUMENT);
  private readonly location = inject(Location);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly route = inject(ActivatedRoute);
  private readonly routeParams = toSignal(this.route.paramMap, { initialValue: this.route.snapshot.paramMap });

  readonly currentIndex = signal(0);
  readonly articleId = computed(() => Number(this.routeParams().get('id') ?? 0));
  readonly routeIndex = computed(() => Number(this.routeParams().get('image') ?? 0));
  readonly article = computed(() => this.data.articleById(this.articleId()));
  readonly image = computed(() => this.article()?.myndasida[this.currentIndex()]);
  readonly imageUrl = computed(() => fullImageUrl(this.image()?.file));

  constructor() {
    const title = inject(Title);

    effect(() => {
      const article = this.article();
      if (!article) {
        return;
      }

      const count = article.myndasida.length;
      const nextIndex = count === 0 ? 0 : Math.max(0, Math.min(this.routeIndex(), count - 1));
      this.currentIndex.set(nextIndex);
      title.setTitle(`${article.title} - mynd ${nextIndex + 1}`);
    });
  }

  @HostListener('window:keyup', ['$event'])
  onKeyUp(event: KeyboardEvent): void {
    if (event.key === 'ArrowRight') {
      this.next();
    } else if (event.key === 'ArrowLeft') {
      this.previous();
    } else if (event.key === 'Escape') {
      this.back();
    }
  }

  next(): void {
    const count = this.article()?.myndasida.length ?? 0;
    if (count > 0) {
      this.currentIndex.update((index) => (index + 1) % count);
    }
  }

  previous(): void {
    const count = this.article()?.myndasida.length ?? 0;
    if (count > 0) {
      this.currentIndex.update((index) => (index - 1 + count) % count);
    }
  }

  back(): void {
    this.exitFullscreen();
    this.location.back();
  }

  requestFullscreen(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    this.document.documentElement.requestFullscreen?.().catch(() => undefined);
  }

  private exitFullscreen(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    this.document.exitFullscreen?.().catch(() => undefined);
  }
}
