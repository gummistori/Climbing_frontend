import { Component, OnInit } from '@angular/core';
import { Article } from '../article';
import { DataService } from '../data.service';


@Component({
  selector: 'app-front',
  templateUrl: './front.component.html',
  styleUrls: ['./front.component.css'],
  providers: [DataService]
})
export class FrontComponent implements OnInit {

  articles: Article[];

  constructor(private data: DataService) {}
  
  ngOnInit(){
    this.data.getArticles().subscribe(data => this.articles = data);
  }
}
