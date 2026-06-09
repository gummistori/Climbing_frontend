import { DatePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { listImageUrl, selectWideImage } from '../core/image-url';
import { ArticleDetails, ArticleSearchResult } from '../core/models';
import { EpochDatePipe } from './epoch-date.pipe';

@Component({
  selector: 'app-article-card',
  imports: [DatePipe, EpochDatePipe, RouterLink],
  templateUrl: './article-card.component.html',
})
export class ArticleCardComponent {
  @Input({ required: true }) article!: ArticleDetails | ArticleSearchResult;
  @Input() compact = false;

  articleLink(article: ArticleDetails): unknown[] {
    const slug = article.titleEng || article.title;
    return slug ? ['/Articles', article.id, slug] : ['/Articles', article.id];
  }

  imageUrl(article: ArticleDetails): string {
    return listImageUrl(selectWideImage(article.myndasida, article.id));
  }

  score(article: ArticleDetails | ArticleSearchResult): number | null {
    return 'score' in article ? article.score : null;
  }
}
