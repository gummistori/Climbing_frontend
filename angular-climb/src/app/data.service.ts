import { Injectable, Inject } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

export interface Phone {
  phoneNumber : string;
};

@Injectable()
export class DataService {
  private phonesUrl = 'https://angular.strumpur.net/api.php';

  constructor(@Inject(HttpClient) private http: HttpClient) { }

  getPhones (): Observable<Phone[]> {
    return this.http.get<Phone[]>(this.phonesUrl)
      .pipe(
        tap(heroes => this.log(`fetched phones`)),
        catchError(this.handleError('getPhones', []))
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
