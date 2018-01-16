import { Component } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {

  constructor() { }

  public collapse = true;

  public showHide() {
    this.collapse = !this.collapse;
  }
}
