import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { ArticleComponent } from './article/article.component';
import { ArticlesComponent } from './articles/articles.component';
import { ClimbingsearchComponent } from './climbingsearch/climbingsearch.component';
import { FrontComponent } from './front/front.component';
import { GalleryImageComponent } from './gallery.image/gallery.image.component';
import { LocationComponent } from './location/location.component';
import { SearchComponent } from './search/search.component';

const routes: Routes = [{ path: '', component: FrontComponent}
, { path: 'Articles/:id', component: ArticleComponent}
, { path: 'Articles/:id/:name', component: ArticleComponent}
, { path: 'Articles', component: ArticlesComponent}
, { path: 'About', component: AboutComponent}
, { path: 'Location', component: LocationComponent}
, { path: 'Search', component: SearchComponent}
, { path: 'NewSearch', component: ClimbingsearchComponent}
, { path: 'Search/:queryString', component: SearchComponent}
, { path: 'ImageFull/:id/:image', component: GalleryImageComponent}
, { path: '*', component: FrontComponent} // change this to 404
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    useHash: false,
    initialNavigation: 'enabledBlocking'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
