import { inject } from '@angular/core';
import { Routes } from '@angular/router';
import { catchError, map, of } from 'rxjs';

import { ClimbingDataService } from './core/climbing-data.service';

const archiveLoaded = () =>
  inject(ClimbingDataService).loadAll().pipe(
    map(() => true),
    catchError(() => of(true)),
  );

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/front/front.page').then((m) => m.FrontPage),
    resolve: { archiveLoaded }
  },
  {
    path: 'Articles',
    loadComponent: () => import('./pages/articles/articles.page').then((m) => m.ArticlesPage),
    resolve: { archiveLoaded }
  },
  {
    path: 'Articles/:id',
    loadComponent: () => import('./pages/article/article.page').then((m) => m.ArticlePage),
    resolve: { archiveLoaded }
  },
  {
    path: 'Articles/:id/:name',
    loadComponent: () => import('./pages/article/article.page').then((m) => m.ArticlePage),
    resolve: { archiveLoaded }
  },
  {
    path: 'About',
    loadComponent: () => import('./pages/about/about.page').then((m) => m.AboutPage)
  },
  {
    path: 'Location',
    loadComponent: () => import('./pages/location/location.page').then((m) => m.LocationPage)
  },
  {
    path: 'Search',
    loadComponent: () => import('./pages/search/search.page').then((m) => m.SearchPage),
    resolve: { archiveLoaded }
  },
  {
    path: 'Search/:queryString',
    loadComponent: () => import('./pages/search/search.page').then((m) => m.SearchPage),
    resolve: { archiveLoaded }
  },
  {
    path: 'NewSearch',
    loadComponent: () => import('./pages/search/search.page').then((m) => m.SearchPage),
    resolve: { archiveLoaded }
  },
  {
    path: 'ImageFull/:id/:image',
    loadComponent: () => import('./pages/image-viewer/image-viewer.page').then((m) => m.ImageViewerPage),
    resolve: { archiveLoaded }
  },
  {
    path: '**',
    redirectTo: ''
  }
];
