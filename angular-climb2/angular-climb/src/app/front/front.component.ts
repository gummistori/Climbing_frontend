import { Title } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';
import { ArticleDetails, getRandomImage } from '../Models/articleDetails';
import { DataService } from '../data.service';

interface FrontData {
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

  articles: FrontData[];

  constructor(private data: DataService, private title: Title) {}

  ngOnInit() {
    this.title.setTitle('Fjallateymið - www.climbing.is');
    this.data.getArticles().subscribe(data => {
      const list: FrontData[] = [];
      for (let i = 0; i < 5; i++) {
        list.push({article: data[i], image: getRandomImage(data[i].myndasida)});
      }
      this.articles = list;
    });

    this.data.InsertFrontHit();
  }
}
