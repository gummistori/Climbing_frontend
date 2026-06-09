import { isPlatformBrowser } from '@angular/common';
import { AfterViewInit, Component, OnDestroy, PLATFORM_ID, inject, signal } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { ClimbingDataService } from '../../core/climbing-data.service';
import { SwLocation } from '../../core/models';
import { ScriptLoaderService } from '../../core/script-loader.service';

declare const SWMap: {
  create: (id: string, options: unknown) => {
    addMarker: (id: string, point: unknown, label: unknown, icon: unknown) => void;
    removeAllDivMarkers: () => void;
    setCenter: (point: unknown) => void;
    setDataset: (id: number) => void;
  };
};

@Component({
  selector: 'app-location-page',
  templateUrl: './location.page.html',
})
export class LocationPage implements AfterViewInit, OnDestroy {
  private readonly data = inject(ClimbingDataService);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly scripts = inject(ScriptLoaderService);
  private readonly title = inject(Title);
  private destroyed = false;
  private firstView = true;
  private map: ReturnType<typeof SWMap.create> | null = null;
  private pollTimer: ReturnType<typeof setTimeout> | null = null;

  readonly currentLocation = signal<SwLocation | null>(null);
  readonly status = signal('Sæki staðsetningu');
  readonly mapReady = signal(false);
  readonly mapType = signal(1);

  ngAfterViewInit(): void {
    this.title.setTitle('Fjallateymið - staðsetning');

    if (!isPlatformBrowser(this.platformId)) {
      this.status.set('Kort birtist í vafra.');
      return;
    }

    this.poll();
  }

  ngOnDestroy(): void {
    this.destroyed = true;
    if (this.pollTimer) {
      clearTimeout(this.pollTimer);
    }
  }

  toggleMapType(): void {
    this.mapType.update((value) => (value + 1) % 4);
    this.map?.setDataset(this.mapType());
  }

  private poll(): void {
    if (this.destroyed) {
      return;
    }

    this.data.getMapEnabled().subscribe((enabled) => {
      if (!enabled) {
        this.status.set('Staðsetning er ekki virk í augnablikinu.');
        return;
      }

      this.data.getLocation().subscribe({
        next: (location) => {
          this.currentLocation.set(location);
          void this.renderMap(location);
          this.pollTimer = setTimeout(() => this.poll(), 5000);
        },
        error: () => {
          this.status.set('Ekki tókst að sækja staðsetningu.');
          this.pollTimer = setTimeout(() => this.poll(), 10000);
        },
      });
    });
  }

  private async renderMap(location: SwLocation): Promise<void> {
    await this.scripts.load('SiteWatchLibrary', 'https://kort.samsyn.is/api/SiteWatch.aspx?key=Klinfyure45&v=2');

    if (typeof SWMap === 'undefined') {
      this.status.set('Ekki tókst að hlaða korti.');
      return;
    }

    this.mapReady.set(true);

    if (!this.map) {
      this.map = SWMap.create('live-location-map', {
        panButton: false,
        zoomButton: false,
        defaultZoom: 2,
        defaultCenterPoint: { x: location.isn93X, y: location.isn93Y },
      });
      this.map.setDataset(this.mapType());
    }

    if (this.firstView) {
      this.map.setCenter({ x: location.isn93X, y: location.isn93Y });
      this.firstView = false;
    }

    this.map.removeAllDivMarkers();
    this.map.addMarker(
      'logo',
      { x: location.isn93X, y: location.isn93Y },
      { text: 'Fjallateymið', fgColor: 'black' },
      { url: '/assets/climbing_maplogo.png', css: 'SiteWatchIcon' },
    );
  }
}
