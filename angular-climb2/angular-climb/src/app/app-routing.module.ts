import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FrontComponent } from './front/front.component';
import { ArticleComponent } from './article/article.component';
import { ArticlesComponent } from './articles/articles.component';
import { AboutComponent } from './about/about.component';
import { SearchComponent } from './search/search.component';
import { GalleryImageComponent } from './gallery.image/gallery.image.component';


const routes: Routes = [{ path: '', component: FrontComponent}
, { path: 'Articles/:id', component: ArticleComponent}
, { path: 'Articles/:id/:name', component: ArticleComponent}
, { path: 'Articles', component: ArticlesComponent}
, { path: 'About', component: AboutComponent}
, { path: 'Search', component: SearchComponent}
, { path: 'Search/:queryString', component: SearchComponent}
, { path: 'ImageFull/:id/:image', component: GalleryImageComponent}
, { path: '**', component: FrontComponent} // change this to 404];
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: false, initialNavigation: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
