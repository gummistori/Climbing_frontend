import { GalleryItem } from './../Models/galleryItem';
import { Article } from './../Models/article';
import { Tag } from './../data.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';
import { ArticleDetails } from '../Models/articleDetails';
import { Title } from '@angular/platform-browser';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';



@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css'],
  providers: [ DataService ]
})
export class ArticlesComponent implements OnInit {

  private allArticles!: ArticleDetails[];
  private searchedArticles!: ArticleDetails[];
  articles!: ArticleDetails[];
  tags!: Tag[];
  cssCollapse = 'collapse';

  constructor(private route: ActivatedRoute, private data: DataService, private title: Title) {
    // this.route.params.subscribe( params => console.log(params) );
    this.data.getTags().subscribe(data => {
      this.tags = data;
    });
    this.data.getArticles().subscribe(arts => {
      this.articles = arts;
      this.allArticles = arts;
      this.filter();
    });
   }

   ToggleFilter() {
    if (this.cssCollapse === '') {
      this.cssCollapse = 'collapse';
    } else {
    this.cssCollapse = '';
   }
  }

  hasKeyword(key: string, art: ArticleDetails) {
    if (art.title.indexOf(key) > 0
        || art.allurtexti.indexOf(key) > 0) {
      return true;
    }

    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < art.myndasida.length; i++) {
      if (art.myndasida[i].description.indexOf(key) > 0) {
        return true;
      }
    }

    return false;
  }

  filter(query: string = '', hideFilter: boolean = false) {
  ///  debugger;
    if (hideFilter) {
      this.cssCollapse = 'collapse';
    }

    if (this.allArticles === null) {
      return;
    }

    const max = 200;
    const list = [];
    let count = 0;
    if (this.tags === null || this.tags.length === 0) {
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < this.allArticles.length; i++) {
        if (query !== '') {
          if (this.allArticles[i].allurtexti.indexOf(query) > 0
              || this.allArticles[i].title.indexOf(query) > 0) {
            list.push(this.allArticles[i]);
            console.log('art ' + this.allArticles[i].id);
            count++;
          } else {
            console.log('Skipped art: ' + this.allArticles[i].id);
          }
        } else {
          list.push(this.allArticles[i]);
        }

        if (count >= max) {
          this.articles = list;
          return;
        }
      }
      this.articles = list;
      return;
    }

    const first = this.tags[0].checked;
    let allSame = true;
    const tags = {};
    tags[this.tags[0].id] = this.tags[0].checked;

    for (let i = 1; i < this.tags.length; i++) {

      tags[this.tags[i].id] = this.tags[i].checked;

      if (first !== this.tags[i].checked) {
        allSame = false;
      }
    }
    if (allSame) {
      for (let i = 0; i < max; i++) {
        list.push(this.allArticles[i]);
      }
      this.articles = list;
      return;
    }

    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.allArticles.length; i++) {
      if (this.allArticles[i].tags === null || this.allArticles[i].tags.length === 0) {
        continue;
      }

      // tslint:disable-next-line:prefer-for-of
      for (let t = 0; t < this.allArticles[i].tags.length; t++) {
        if (tags[this.allArticles[i].tags[t]]) {
          if (query !== '') {
            if (this.hasKeyword(query, this.allArticles[i])) {
              list.push(this.allArticles[i]);
            }
          } else {
            list.push(this.allArticles[i]);
            break;
          }
        }
      }

      if (list.length > max) {
        break;
      }
    }

    this.articles = list;
  }

  ngOnInit() {

    this.title.setTitle('Greinar - Fjallateymið');

    this.data.getArticles().subscribe(data => {
      this.allArticles = data;
      this.filter();
    });

    this.data.getTags().subscribe(data => {
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < data.length; i++) {
        data[i].checked = false;
      }
      this.tags = data;
    });
  }

}
