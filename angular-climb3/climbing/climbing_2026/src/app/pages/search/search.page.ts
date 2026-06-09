import { Component, DestroyRef, computed, effect, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { toSignal, takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { ClimbingDataService } from '../../core/climbing-data.service';
import { SearchResult } from '../../core/models';
import { ArticleCardComponent } from '../../shared/article-card.component';

@Component({
  selector: 'app-search-page',
  imports: [ArticleCardComponent, FormsModule],
  templateUrl: './search.page.html',
})
export class SearchPage {
  private readonly data = inject(ClimbingDataService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly route = inject(ActivatedRoute);
  private readonly routeParams = toSignal(this.route.paramMap, { initialValue: this.route.snapshot.paramMap });
  private routedSearch: string | null = null;

  readonly searchString = signal('');
  readonly suggestions = signal<string[]>([]);
  readonly results = signal<SearchResult[] | null>(null);
  readonly loading = signal(false);
  readonly error = signal<string | null>(null);
  readonly resultArticles = computed(() => this.data.articlesFromSearch(this.results() ?? []));

  constructor() {
    inject(Title).setTitle('Leit - Fjallateymið');

    effect(() => {
      const queryString = this.routeParams().get('queryString');
      if (queryString && queryString !== this.routedSearch) {
        this.routedSearch = queryString;
        this.searchString.set(queryString);
        this.runSearch(queryString);
      }
    });
  }

  updateSearch(value: string): void {
    this.searchString.set(value);
    this.error.set(null);

    if (value.trim().length < 2) {
      this.suggestions.set([]);
      return;
    }

    this.data.autocomplete(value.trim())
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((suggestions) => this.suggestions.set(suggestions.map((item) => item.word).slice(0, 8)));
  }

  runSearch(value = this.searchString()): void {
    const term = value.trim();
    if (term.length < 2) {
      this.error.set('Sláðu inn að minnsta kosti tvo stafi.');
      return;
    }

    this.loading.set(true);
    this.error.set(null);
    this.suggestions.set([]);

    this.data.search(term)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (data) => {
          this.results.set(data.joinResult ?? []);
          this.loading.set(false);
        },
        error: () => {
          this.loading.set(false);
          this.error.set('Ekki tókst að sækja leitarniðurstöður.');
        },
      });
  }

  searchSuggestion(value: string): void {
    this.searchString.set(value);
    this.runSearch(value);
  }
}
