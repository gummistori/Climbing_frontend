import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';
import { ArticleDetails, getRandomImage } from '../articleDetails';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css'],
  providers: [DataService]
})

export class ArticleComponent implements OnInit {
  id: number;
  articleDetails: ArticleDetails;
  image: string = "";
  constructor(private route: ActivatedRoute, private data: DataService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number
      console.log(this.id);
      this.data.getArticle(this.id).subscribe(data => {
        this.articleDetails = data; 
        this.image = "http://www.climbing.is/headPic.php/"+getRandomImage(data.gallery);
        console.log(data);
        
      });
      // In a real app: dispatch action to load the details here.
   });
  }

}
