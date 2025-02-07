import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  searchString = "";
  router: Router;
  showLocation = false;
  constructor(_router: Router, private http: DataService) {
    this.router = _router;
    // this.searchString = 'f';
  }

  ngOnInit(): void {
      this.http.getMapEnabled().subscribe(data => {
        this.showLocation = data;
      });
  }

  public collapse = true;

  public showHide() {
    this.collapse = !this.collapse;
  }

  public hide() {
    this.collapse = true;
  }

  public onSubmit() {
    this.router.navigate(['Search', this.searchString]);
  }
}
