import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router, Routes } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {
  searchString: string;
  router: Router;
  constructor(_router: Router) {
    this.router = _router;
    // this.searchString = 'f';
  }

  public collapse = true;

  public showHide() {
    this.collapse = !this.collapse;
  }

  public onSubmit() {
    this.router.navigate(['Search', this.searchString]);
  }
}
