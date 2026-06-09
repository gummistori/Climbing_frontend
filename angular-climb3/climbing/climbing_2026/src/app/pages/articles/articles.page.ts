import { Component, computed, inject, signal } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { ClimbingDataService } from '../../core/climbing-data.service';
import { ArticleDetails } from '../../core/models';
import { ArticleCardComponent } from '../../shared/article-card.component';

@Component({
  selector: 'app-articles-page',
  imports: [ArticleCardComponent],
  templateUrl: './articles.page.html',
})
export class ArticlesPage {
  private readonly data = inject(ClimbingDataService);

  readonly query = signal('');
  readonly selectedTags = signal<ReadonlySet<number>>(new Set());
  readonly tags = this.data.tags;

  readonly filteredArticles = computed(() => {
    const query = this.query().trim().toLocaleLowerCase();
    const selectedTags = this.selectedTags();

    return this.data.articles()
      .filter((article) => this.matchesTags(article, selectedTags))
      .filter((article) => this.matchesQuery(article, query))
      .slice(0, 200);
  });

  constructor() {
    inject(Title).setTitle('Greinar - Fjallateymið');
  }

  setQuery(value: string): void {
    this.query.set(value);
  }

  toggleTag(id: number, checked: boolean): void {
    this.selectedTags.update((current) => {
      const next = new Set(current);
      if (checked) {
        next.add(id);
      } else {
        next.delete(id);
      }
      return next;
    });
  }

  clearFilters(): void {
    this.query.set('');
    this.selectedTags.set(new Set());
  }

  isSelected(id: number): boolean {
    return this.selectedTags().has(id);
  }

  private matchesTags(article: ArticleDetails, selectedTags: ReadonlySet<number>): boolean {
    if (selectedTags.size === 0) {
      return true;
    }

    return article.tags.some((tag) => selectedTags.has(tag));
  }

  private matchesQuery(article: ArticleDetails, query: string): boolean {
    if (!query) {
      return true;
    }

    return [
      article.title,
      article.titleEng,
      article.allurtexti,
      ...article.myndasida.map((image) => image.description),
    ]
      .filter(Boolean)
      .some((value) => value!.toLocaleLowerCase().includes(query));
  }
}
