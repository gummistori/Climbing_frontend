import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Article } from '../article';
import { Observable } from 'rxjs/Observable';


@Component({
  selector: 'app-front',
  templateUrl: './front.component.html',
  styleUrls: ['./front.component.css']
})
export class FrontComponent implements OnInit {

  readonly ROOT_URL = 'http://new.climbing.is/getGreinar.php';
  articles: Observable<Article[]>;

  constructor(private http: HttpClient) {}


  getArticles(){
    this.articles = this.http.get<Article[]>(this.ROOT_URL);
  }
  
  ngOnInit(){
    this.getArticles();

  }
}
