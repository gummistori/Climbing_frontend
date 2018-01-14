import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Fjallateymið - climbing.is';

  constructor(private titleService: Title) {
    this.titleService.setTitle( this.title );
  }
}
