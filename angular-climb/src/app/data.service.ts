import { Injectable, Inject } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

import { ArticleDetails } from './articleDetails';
import { FunctionCall } from '@angular/compiler';

export interface Tag {
  id: number;
  name: string;
  nameEnglish: string;
  checked: boolean;
}

interface AllData {
  articles: ArticleDetails[];
  tags: Tag[];
}


@Injectable()
export class DataService {
  public readonly ROOT_URL = 'http://new.climbing.is/';
  private jobs: any[] = [];
  private data: AllData = null;

  constructor(@Inject(HttpClient) private http: HttpClient) {
    const dataValue = window.sessionStorage.getItem('data');
    if (dataValue) {
      this.data = JSON.parse(dataValue);
      return;
    }

    this.http.get<AllData>(this.ROOT_URL + 'getAll.php')
      .pipe(
        tap(heroes => this.log(`fetched all`)),
        catchError(this.handleError('getAll', null))
      ).subscribe(data => {
        window.sessionStorage.setItem('data', JSON.stringify(data));
        this.data = data;
        for (let i = 0; i < this.jobs.length; i++) {
          this.jobs[i].f.call(this, this.jobs[i].a);
        }
      });
   }

  getArticles(): Observable<ArticleDetails[]> {
    const f = function(observer){
      observer.next(this.data.articles);
      observer.complete();
    };

    return new Observable(observer => {
      if (this.data !== null) {
        f.call(this, observer);
        return;
      }
      this.jobs.push({f: f, a: observer});
    });
  }

  getArticle(id: number): Observable<ArticleDetails> {
    const f = function(observer) {
      for (let i = 0; i < this.data.articles.length; i++) {
        if (this.data.articles[i].id === id) {
          observer.next(this.data.articles[i]);
          break;
        }
      }
      observer.complete();
    };

    return new Observable(observer => {
      if (this.data !== null) {
        f.call(this, observer);
        return;
      }
      this.jobs.push({f: f, a: observer});
    });
  }

  getTags(): Observable<Tag[]> {
    const f = function(observer){
      observer.next(this.data.tags);
      observer.complete();
    };

    return new Observable(observer => {
      if (this.data !== null) {
        f.call(this, observer);
        return;
      }
      this.jobs.push({f: f, a: observer});
    });
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    // this.messageService.add('HeroService: ' + message);
  }
}
