import { Component, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

import { ClimbingDataService } from '../core/climbing-data.service';

@Component({
  selector: 'app-nav',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './nav.component.html',
})
export class NavComponent {
  private readonly data = inject(ClimbingDataService);

  readonly menuOpen = signal(false);
  readonly showLocation = signal(false);

  constructor() {
    this.data.getMapEnabled().subscribe((enabled) => this.showLocation.set(enabled));
  }

  toggleMenu(): void {
    this.menuOpen.update((value) => !value);
  }

  closeMenu(): void {
    this.menuOpen.set(false);
  }
}
