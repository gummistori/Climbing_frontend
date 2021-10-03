// import { DataService } from './data.service';
import { Injectable, Inject } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';

import { Observable ,  of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { SearchData, Searchresult } from './Models/searchresult';
import { ArticleDetails, ArticleDetailsSearch } from './Models/articleDetails';
import { FunctionCall } from '@angular/compiler';
import { Article } from './Models/article';
// import { basename } from 'path';

const searchUrl = "/climbingSearch/search/search?search=";
// const searchUrl = "https://localhost:44341/Search/Search?Search=";
export interface Tag {
  id: number;
  name: string;
  nameEnglish: string;
  checked: boolean;
}

interface AllData {
  articles: ArticleDetails[];
  tags: number[];
}

interface SearchResults {
  articles: ArticleDetails[];
}

@Injectable()
export class DataService {
  private static data: AllData = null;
  public readonly ROOT_URL = 'https://data.climbing.is/';
  private jobs: any[] = [];

  constructor(@Inject(HttpClient) private http: HttpClient) {
    if (DataService.data !== null) {
      return;
    }
    /*const dataValue = window.localStorage.getItem('data');
    if (dataValue) {
      this.data = JSON.parse(dataValue);
      return;
    }
*/
    this.http.get<AllData>(this.ROOT_URL + 'getAll.php')
      .pipe(
        tap(heroes => this.log(`fetched all`)),
        catchError(this.handleError('getAll', null))
      ).subscribe(data => {
  //      window.localStorage.setItem('data', JSON.stringify(data));
        DataService.data = data;
        for (let i = 0; i < this.jobs.length && true; i++) {
          this.jobs[i].f.call(this, this.jobs[i].a);
        }
    });
  }

  getArticles(): Observable<ArticleDetails[]> {
    // tslint:disable-next-line:only-arrow-functions
    const f = function(observer){
      observer.next(DataService.data.articles);
      observer.complete();
    };

    return new Observable(observer => {
      if (DataService.data !== null) {
        f.call(this, observer);
        return;
      }
      this.jobs.push({f, a: observer});
    });
  }

  getArticle(id: number): Observable<ArticleDetails> {
    // tslint:disable-next-line:only-arrow-functions
    const f = function(observer) {
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < DataService.data.articles.length; i++) {
        if (DataService.data.articles[i].id === id) {
          observer.next(DataService.data.articles[i]);
          break;
        }
      }
      observer.complete();
    };

    return new Observable(observer => {
      if (DataService.data !== null) {
        f.call(this, observer);
        return;
      }
      this.jobs.push({f, a: observer});
    });
  }

  getTagName(id: number): string {
    let tagList: Tag[];
    this.getTags().subscribe(tags => {
      tagList = tags as Tag[];
    });

    for (let i = 0; i < DataService.data.tags.length; i++) {
      if (tagList[i].id === id) {
        return tagList[i].name;
      }
    }
  }

  getFindResults(query: string): Observable<ArticleDetails[]> {
    // tslint:disable-next-line:only-arrow-functions
    const f = function(observer) {
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < DataService.data.articles.length; i++) {
        if (DataService.data.articles[i].id > 211) {
          observer.next(DataService.data.articles[i]);
          break;
        }
      }
      observer.complete();
    };

    return new Observable(observer => {
      if (DataService.data !== null) {
        f.call(this, observer);
        return;
      }
      this.jobs.push({f, a: observer});
    });
  }

  getTags(): Observable<Tag[]> {
    // tslint:disable-next-line:only-arrow-functions
    const f = function(observer){
      observer.next(DataService.data.tags);
      observer.complete();
    };

    return new Observable(observer => {
      if (DataService.data !== null) {
        f.call(this, observer);
        return;
      }
      this.jobs.push({f, a: observer});
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

  InsertHit(articleId: number) {
    // console.log('inserting hit on artId: ' + articleId);
    const postData = new FormData();
    postData.append('artId', articleId.toString());

    this.http.post(this.ROOT_URL + 'addHit.php', postData).subscribe();
  }

  InsertFrontHit() {
    // const postData = new FormData();
    // postData.append('front', 'hit');

    this.http.get(this.ROOT_URL + 'addFrontVisit.php').subscribe();
  }

  Search(str: string) {
    return this.http.get<SearchData>(searchUrl + str);
  }

  GetArticleByIdList (searchRes: Searchresult[]): ArticleDetailsSearch[] {
    
    let res: ArticleDetailsSearch[] = [];

    DataService.data.articles.forEach(element => {
      for (let i = 0; i < searchRes.length; i++) {
        if (element.id === searchRes[i].id && searchRes[i].score <= 5) {
          let el: ArticleDetailsSearch = { score: searchRes[i].score, id: element.id, 
            title: element.title, titleEng: element.titleEng, writer: element.writer,
            allurtexti: element.allurtexti, allurtextiEng: element.allurtextiEng,
            frettaritari: element.frettaritari, dagsetning: element.dagsetning,
            videoEmbed: element.videoEmbed, videoLink: element.videoLink,
            flightTrack: element.flightTrack, x: element.x, y: element.y,
            lat: element.lat, lon: element.lon, myndasida: element.myndasida,
            tags: element.tags };
          res.push(el);
        }
      }
    });

    res.sort((a, b) => { return (a.score > b.score) ? 1 : -1; });

    return res;
  }

}

