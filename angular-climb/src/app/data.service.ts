import { Injectable, Inject } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

import { Article } from './article';
import { ArticleDetails } from './articleDetails';

@Injectable()
export class DataService {
  readonly ROOT_URL = 'http://new.climbing.is/';
  private phonesUrl = 'http://new.climbing.is/getGreinar.php';

  constructor(@Inject(HttpClient) private http: HttpClient) { }

  getArticles():Observable<Article[]>{
    return this.http.get<Article[]>(this.ROOT_URL+'getGreinar.php')
      .pipe(
        tap(heroes => this.log(`fetched article`)),
        catchError(this.handleError('getArticles', []))
      );
  }
  
  getArticle(id:number):Observable<ArticleDetails>{
    return this.http.get<ArticleDetails>(this.ROOT_URL+'getGrein.php?id='+id)
      .pipe(
        tap(heroes => this.log(`fetched article`)),
        catchError(this.handleError('getArticle', []))
      );
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
    //this.messageService.add('HeroService: ' + message);
  }
}
