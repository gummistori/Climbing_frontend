import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Article } from './article';
import { NgClass } from '@angular/common';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Fjallateymið - climbing.is';

  readonly ROOT_URL = 'http://new.climbing.is/getGreinar.php';
  articles: Observable<Article[]>;

  constructor(private http: HttpClient) {}


  getArticles() {
    this.articles = this.http.get<Article[]>(this.ROOT_URL);
  }

  ngOnInit() {
    this.getArticles();

  }
}
