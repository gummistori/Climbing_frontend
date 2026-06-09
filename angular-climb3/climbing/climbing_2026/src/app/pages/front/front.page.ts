import { DatePipe, isPlatformBrowser } from '@angular/common';
import { Component, PLATFORM_ID, computed, inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';

import { ClimbingDataService } from '../../core/climbing-data.service';
import { headImageUrl, listImageUrl, selectWideImage } from '../../core/image-url';
import { ArticleDetails } from '../../core/models';
import { ArticleCardComponent } from '../../shared/article-card.component';
import { BannersComponent } from '../../shared/banners.component';
import { EpochDatePipe } from '../../shared/epoch-date.pipe';

@Component({
  selector: 'app-front-page',
  imports: [ArticleCardComponent, BannersComponent, DatePipe, EpochDatePipe, RouterLink],
  templateUrl: './front.page.html',
})
export class FrontPage {
  private readonly data = inject(ClimbingDataService);
  private readonly platformId = inject(PLATFORM_ID);

  readonly articles = computed(() => this.data.articles().slice(0, 5));
  readonly error = this.data.error;
  readonly leadArticle = computed(() => this.articles()[0]);
  readonly secondaryArticles = computed(() => this.articles().slice(1));

  constructor() {
    inject(Title).setTitle('Fjallateymið - www.climbing.is');

    if (isPlatformBrowser(this.platformId)) {
      this.data.insertFrontHit();
    }
  }

  leadImage(article: ArticleDetails): string {
    return headImageUrl(selectWideImage(article.myndasida, article.id));
  }

  listImage(article: ArticleDetails): string {
    return listImageUrl(selectWideImage(article.myndasida, article.id));
  }
}
