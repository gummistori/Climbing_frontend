import { GalleryItem } from './../Models/galleryItem';
import { Article } from './../Models/article';
import { Tag } from './../data.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';
import { ArticleDetails } from '../Models/articleDetails';
import { RouterModule } from '@angular/router';
import { ArticlesRandomImageComponent } from '../articles.random.image/articles.random.image.component';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  providers: [ DataService ]
})
export class SearchComponent implements OnInit {

  private allArticles!: ArticleDetails[];
  private searchedArticles!: ArticleDetails[];
  private queryString!: string;
  articles!: ArticleDetails[];
  tags!: Tag[];

  constructor(private route: ActivatedRoute, private data: DataService) {
    this.route.params.subscribe( params => {
      // console.log(params);
    });
   }

  static hasKeyword(key: string, art: ArticleDetails) {
    if (art.title.toLocaleLowerCase().indexOf(key) > 0
        || art.allurtexti.toLocaleLowerCase().indexOf(key) > 0) {
      return true;
    }

    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < art.myndasida.length; i++) {
      if (art.myndasida[i].description.toLocaleLowerCase().indexOf(key) > 0) {
        return true;
      }
    }

    return false;
  }

  filter(query: string = '') {
  ///  debugger;
    if (this.allArticles === null) {
      return;
    }

    const max = 100;
    const list = [];
    query = query.toLocaleLowerCase();
    if (this.tags === null || this.tags.length === 0) {
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < this.allArticles.length; i++) {
        if (query !== '') {
          if (SearchComponent.hasKeyword(query, this.allArticles[i])) {
            list.push(this.allArticles[i]);
            // console.log('art ' + this.allArticles[i].id);
          } else {
            // console.log('Skipped art: ' + this.allArticles[i].id);
          }

        } else {
          list.push(this.allArticles[i]);
        }

        if (list.length >= max) {
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
    // tags[this.tags[0].id] = this.tags[0].checked;

    // for (let i = 1; i < this.tags.length; i++) {

    //   tags[this.tags[i].id] = this.tags[i].checked;

    //   if (first !== this.tags[i].checked) {
    //     allSame = false;
    //   }
    // }

    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.allArticles.length; i++) {
      if (this.allArticles[i].tags === null || this.allArticles[i].tags.length === 0) {
        continue;
      }

      // tslint:disable-next-line:prefer-for-of
      // for (let t = 0; t < this.allArticles[i].tags.length; t++) {
      //   if (tags[this.allArticles[i].tags[t]]) {
      //     if (query !== '') {
      //       if (SearchComponent.hasKeyword(query, this.allArticles[i])) {
      //         list.push(this.allArticles[i]);
      //       }
      //     } else {
      //       list.push(this.allArticles[i]);
      //       break;
      //     }
      //   }
      // }

      if (list.length > max) {
        break;
      }
    }

    // this.articles = list;
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      // tslint:disable-next-line:no-string-literal
      const qryString = params['queryString'];
      this.data.getArticles().subscribe(data => {
        this.allArticles = data;
        this.filter(qryString.toLocaleLowerCase());
        // console.log('onInit: ' + qryString);
      });

    });
  }

}
