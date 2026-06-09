import { Component, inject } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-about-page',
  templateUrl: './about.page.html',
})
export class AboutPage {
  constructor() {
    inject(Title).setTitle('Um okkur - Fjallateymið');
  }
}
