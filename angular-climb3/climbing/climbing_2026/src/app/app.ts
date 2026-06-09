import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './layout/footer.component';
import { NavComponent } from './layout/nav.component';

@Component({
  selector: 'app-root',
  imports: [FooterComponent, NavComponent, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {}
