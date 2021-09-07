import { Component, Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, Title } from '@angular/platform-browser';

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
  title = 'angular-climb';

  constructor(private titleService: Title) {
    this.titleService.setTitle( this.title );
  }
}
