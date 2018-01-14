import { Component, OnInit } from '@angular/core';
import { ArticleDetails } from '../articleDetails';
import { DataService } from '../data.service';


@Component({
  selector: 'app-front',
  templateUrl: './front.component.html',
  styleUrls: ['./front.component.css'],
  providers: [DataService]
})
export class FrontComponent implements OnInit {

  articles: ArticleDetails[];

  constructor(private data: DataService) {}

  ngOnInit() {
    this.data.getArticles().subscribe(data => this.articles = data);
  }
}
