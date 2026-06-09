import { isPlatformBrowser } from '@angular/common';
import { AfterViewInit, Component, Input, PLATFORM_ID, inject } from '@angular/core';

import { ArticleDetails } from '../core/models';
import { ScriptLoaderService } from '../core/script-loader.service';

declare const SWMap: {
  create: (id: string, options: unknown) => {
    addMarker: (id: string, point: unknown, label: string, icon: string) => void;
    setDataset: (id: number) => void;
  };
};

declare const Microsoft: {
  Maps: {
    Location: new (lat: number, lon: number) => unknown;
    Map: new (element: HTMLElement | null, options: unknown) => unknown;
    MapTypeId: { aerial: string };
  };
};

let articleMapCounter = 0;

@Component({
  selector: 'app-article-map',
  templateUrl: './article-map.component.html',
})
export class ArticleMapComponent implements AfterViewInit {
  private readonly scripts = inject(ScriptLoaderService);
  private readonly platformId = inject(PLATFORM_ID);
  private viewReady = false;

  readonly mapId = `article-map-${articleMapCounter++}`;

  private articleValue: ArticleDetails | null = null;

  @Input()
  set article(value: ArticleDetails | null | undefined) {
    this.articleValue = value ?? null;
    void this.renderMap();
  }

  ngAfterViewInit(): void {
    this.viewReady = true;
    void this.renderMap();
  }

  private async renderMap(): Promise<void> {
    if (!this.viewReady || !isPlatformBrowser(this.platformId) || !this.articleValue) {
      return;
    }

    const article = this.articleValue;

    if (article.x !== null && article.y !== null) {
      await this.scripts.load('SiteWatchLibrary', 'https://kort.samsyn.is/api/SiteWatch.aspx?key=Klinfyure45&v=2');

      if (typeof SWMap === 'undefined') {
        return;
      }

      const map = SWMap.create(this.mapId, {
        panButton: false,
        zoomButton: false,
        defaultZoom: 1,
        defaultCenterPoint: { x: article.x, y: article.y },
      });

      map.addMarker('svaedi', { x: article.x, y: article.y }, '', '/assets/img/poi.png');
      map.setDataset(1);
      return;
    }

    if (article.lat !== null && article.lon !== null) {
      await this.scripts.load('BingMaps', 'https://www.bing.com/api/maps/mapcontrol?key=AvqjeaC_aQhAJre-FOfeoQcF-AHsJz5WaAJP2CYtDuAlO7z7Bx_sr_ZrpyZXieRK');

      if (typeof Microsoft === 'undefined') {
        return;
      }

      new Microsoft.Maps.Map(document.getElementById(this.mapId), {
        center: new Microsoft.Maps.Location(article.lat, article.lon),
        mapTypeId: Microsoft.Maps.MapTypeId.aerial,
        zoom: 5,
      });
    }
  }
}
