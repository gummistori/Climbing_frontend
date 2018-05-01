import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { Component, ViewEncapsulation, PipeTransform, Pipe } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({ name: 'safe' })
export class SafePipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) { }
  transform(url) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}

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
