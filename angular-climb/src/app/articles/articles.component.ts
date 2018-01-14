import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService, Tag } from '../data.service';
import { Article } from '../article';



@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css'],
  providers: [ DataService ]
})
export class ArticlesComponent implements OnInit {

  private allArticles: Article[];
  articles: Article[];
  tags: Tag[] = null;

  constructor(private route: ActivatedRoute, private data: DataService) {
    this.route.params.subscribe( params => console.log(params) );
   }

  filter() {
  ///  debugger;
    if (this.tags === null || this.tags.length === 0 || this.allArticles === null){
      this.articles = this.allArticles;
      return;
    }

    const first = this.tags[0].checked;
    let allSame = true;
    let tags = {};
    tags[this.tags[0].id] = this.tags[0].checked;
    for (let i = 1; i < this.tags.length; i++) {
      tags[this.tags[i].id] = this.tags[i].checked;
      if (first !== this.tags[i].checked) {
        allSame = false;
      }
    }


    if (allSame) {
      this.articles = this.allArticles;
      return;
    }

    let list = [];
    for (let i = 0; i < this.allArticles.length; i++) {
      if (this.allArticles[i].tags === null || this.allArticles[i].tags.length === 0) {
        continue;
      }

      for (let t = 0; t < this.allArticles[i].tags.length; t++) {
        if (tags[this.allArticles[i].tags[t]]) {
          list.push(this.allArticles[i]);
          break;
        }
      }
    }

    this.articles = list;
  }
  ngOnInit() {
    this.data.getArticles().subscribe(data => { this.allArticles = data; this.filter(); });
    this.data.getTags().subscribe(data => {
      for (let i = 0; i < data.length; i++) {
        data[i].checked = false;
      }
      this.tags = data;
    });
  }

}
