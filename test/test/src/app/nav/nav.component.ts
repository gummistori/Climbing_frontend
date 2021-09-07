import { Component } from '@angular/core';
import { Router, Routes } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {
  searchString = '';
  router: Router;
  constructor(router: Router) {
    this.router = router;
    // this.searchString = 'f';
  }

  public collapse = true;

  public showHide(): void {
    this.collapse = !this.collapse;
  }

  public hide(): void {
    this.collapse = true;
  }

  public onSubmit(): void {
    this.router.navigate(['Search', this.searchString]);
  }
}
