import { Component, OnInit } from '@angular/core';
import { ArticleDetails, getRandomImage } from '../articleDetails';
import { DataService } from '../data.service';

interface frontData {
  article: ArticleDetails;
  image: string;
}

@Component({
  selector: 'app-front',
  templateUrl: './front.component.html',
  styleUrls: ['./front.component.css'],
  providers: [DataService]
})
export class FrontComponent implements OnInit {

  articles: frontData[];

  constructor(private data: DataService) {}

  ngOnInit() {
    this.data.getArticles().subscribe(data => {
      const list: frontData[] = [];
      for (let i = 0; i < 5; i++) {
        list.push({article: data[i], image: getRandomImage(data[i].myndasida)});
      }
      this.articles = list;
    });
  }
}
