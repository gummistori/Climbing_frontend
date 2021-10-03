import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { ArticleDetailsSearch } from '../Models/articleDetails';
import { Searchresult } from '../Models/searchresult';

@Component({
  selector: 'app-climbingsearch',
  templateUrl: './climbingsearch.component.html',
  styleUrls: ['./climbingsearch.component.css']
})
export class ClimbingsearchComponent implements OnInit {
  searchString = "";
  results: Searchresult[];
  resultArticles: ArticleDetailsSearch[];

  constructor(private service: DataService) { }

  ngOnInit(): void {
  }


  search(): void {

    if (this.searchString.length > 2) {
      console.log(this.searchString);

      // this.results = JSON.parse('{"joinResult":[{"score":6,"id":254,"title":"Dyrhamar og Hnúkurinn"},{"score":6,"id":252,"title":"Þverártindsegg FÍ"},{"score":6,"id":241,"title":"Fögrufjöll við Langasjó"},{"score":6,"id":229,"title":"Nepal"},{"score":6,"id":220,"title":"Þverártindsegg"},{"score":6,"id":185,"title":"Ísfestival á Ísafirði 2013"},{"score":6,"id":136,"title":"Vatnajökull í svart/hvítu"},{"score":6,"id":103,"title":"Lómagnúpur 12 apríl"},{"score":6,"id":119,"title":"NA-hryggur Skessuhorns 26. des 2008"},{"score":6,"id":173,"title":"Norðurhlíð Heiðarhorns"}]}').joinResult;
      
      this.service.Search(this.searchString).subscribe(data => {
        this.results = data['joinResult'];

        this.resultArticles = this.service.GetArticleByIdList(this.results);

      });

      if (!this.results) {
        console.log('No data');
        return;
      }
      
      
    }
  }
}
