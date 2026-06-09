import { DatePipe, isPlatformBrowser } from '@angular/common';
import { Component, PLATFORM_ID, computed, effect, inject, signal } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';

import { ClimbingDataService } from '../../core/climbing-data.service';
import { headImageUrl, selectWideImage } from '../../core/image-url';
import { ArticleMapComponent } from '../../shared/article-map.component';
import { ArticleVideoComponent } from '../../shared/article-video.component';
import { EpochDatePipe } from '../../shared/epoch-date.pipe';
import { GalleryComponent } from '../../shared/gallery.component';

@Component({
  selector: 'app-article-page',
  imports: [ArticleMapComponent, ArticleVideoComponent, DatePipe, EpochDatePipe, GalleryComponent],
  templateUrl: './article.page.html',
})
export class ArticlePage {
  private readonly data = inject(ClimbingDataService);
  private readonly meta = inject(Meta);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly route = inject(ActivatedRoute);
  private readonly title = inject(Title);
  private readonly routeParams = toSignal(this.route.paramMap, { initialValue: this.route.snapshot.paramMap });
  private hitArticleId: number | null = null;

  readonly darkText = signal(false);
  readonly articleId = computed(() => Number(this.routeParams().get('id') ?? 0));
  readonly article = computed(() => this.data.articleById(this.articleId()));
  readonly heroImage = computed(() => {
    const article = this.article();
    return headImageUrl(selectWideImage(article?.myndasida, this.articleId()));
  });
  readonly textClass = computed(() => this.darkText() ? 'article-copy light-copy' : 'article-copy dark-copy');

  constructor() {
    effect(() => {
      const article = this.article();
      if (!article) {
        return;
      }

      this.title.setTitle(`${article.title} - Fjallateymið`);
      this.meta.updateTag({
        name: 'description',
        content: this.stripHtml(article.allurtexti).slice(0, 160),
      });
    });

    effect(() => {
      const article = this.article();
      const id = this.articleId();
      if (article && id && this.hitArticleId !== id && isPlatformBrowser(this.platformId)) {
        this.hitArticleId = id;
        this.data.insertArticleHit(id);
      }
    });
  }

  toggleTextColor(): void {
    this.darkText.update((value) => !value);
  }

  tagName(tagId: number): string {
    return this.data.tagName(tagId);
  }

  private stripHtml(value: string | null): string {
    return (value ?? '').replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
  }
}
