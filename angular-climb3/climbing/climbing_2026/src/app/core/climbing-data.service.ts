import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { Observable, catchError, map, of, shareReplay, tap } from 'rxjs';

import {
  AllData,
  ArticleDetails,
  ArticleSearchResult,
  AutoCompleteResult,
  SearchData,
  SearchResult,
  SwLocation,
  Tag,
} from './models';

const ROOT_URL = 'https://data.climbing.is/';
const SEARCH_URL = 'https://c.climbing.is/climbingSearch/search/search?search=';
const AUTOCOMPLETE_URL = 'https://c.climbing.is/climbingSearch/Search/Autocomplete?Search=';
const LOCATION_URL = 'https://c.climbing.is/climbingSearch/Location';

@Injectable({ providedIn: 'root' })
export class ClimbingDataService {
  private readonly http = inject(HttpClient);
  private allDataRequest?: Observable<AllData>;

  private readonly articlesSignal = signal<ArticleDetails[]>([]);
  private readonly tagsSignal = signal<Tag[]>([]);
  private readonly loadingSignal = signal(false);
  private readonly errorSignal = signal<string | null>(null);

  readonly articles = this.articlesSignal.asReadonly();
  readonly tags = this.tagsSignal.asReadonly();
  readonly loading = this.loadingSignal.asReadonly();
  readonly error = this.errorSignal.asReadonly();
  readonly hasArticles = computed(() => this.articlesSignal().length > 0);

  loadAll(): Observable<AllData> {
    if (this.hasArticles()) {
      return of({ articles: this.articlesSignal(), tags: this.tagsSignal() });
    }

    if (!this.allDataRequest) {
      this.loadingSignal.set(true);
      this.errorSignal.set(null);

      this.allDataRequest = this.http.get<AllData>(`assets/data.json`, {}).pipe(
        map((data) => this.normalizeAllData(data)),
        tap((data) => {
          this.articlesSignal.set(data.articles);
          this.tagsSignal.set(data.tags);
          this.loadingSignal.set(false);
        }),
        catchError((error: unknown) => {
          this.loadingSignal.set(false);
          this.errorSignal.set('Ekki tókst að sækja greinasafnið.');
          this.allDataRequest = undefined;
          return of({ articles: [], tags: [] });
        }),
        shareReplay({ bufferSize: 1, refCount: false }),
      );
    }

    return this.allDataRequest;
  }

  articleById(id: number | null): ArticleDetails | undefined {
    if (!id) {
      return undefined;
    }

    return this.articlesSignal().find((article) => article.id === id);
  }

  tagName(id: number): string {
    return this.tagsSignal().find((tag) => tag.id === id)?.name ?? '';
  }

  getMapEnabled(): Observable<boolean> {
    return this.http.get<boolean>(`${ROOT_URL}mapEnabled.php`).pipe(catchError(() => of(false)));
  }

  getLocation(): Observable<SwLocation> {
    return this.http.post<SwLocation>(LOCATION_URL, {});
  }

  insertArticleHit(articleId: number): void {
    const postData = new FormData();
    postData.append('artId', articleId.toString());
    this.http.post(`${ROOT_URL}addHit.php`, postData).subscribe({ error: () => undefined });
  }

  insertFrontHit(): void {
    this.http.get(`${ROOT_URL}addFrontVisit.php`).subscribe({ error: () => undefined });
  }

  search(term: string): Observable<SearchData> {
    return this.http.get<SearchData>(`${SEARCH_URL}${encodeURIComponent(term)}`);
  }

  autocomplete(term: string): Observable<AutoCompleteResult[]> {
    return this.http.get<AutoCompleteResult[]>(`${AUTOCOMPLETE_URL}${encodeURIComponent(term)}`).pipe(
      catchError(() => of([])),
    );
  }

  articlesFromSearch(results: SearchResult[]): ArticleSearchResult[] {
    const byId = new Map(this.articlesSignal().map((article) => [article.id, article]));

    return results
      .filter((result) => result.score <= 5)
      .map((result) => {
        const article = byId.get(result.id);
        return article ? ({ ...article, score: result.score }) : undefined;
      })
      .filter((article): article is ArticleSearchResult => Boolean(article))
      .sort((a, b) => a.score - b.score);
  }

  private normalizeAllData(data: AllData): AllData {
    return {
      articles: (data.articles ?? []).map((article) => ({
        ...article,
        myndasida: article.myndasida ?? [],
        tags: article.tags ?? [],
      })),
      tags: data.tags ?? [],
    };
  }
}
