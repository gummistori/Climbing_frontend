import { SearchComponent } from './search/search.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { BannersComponent } from './banners/banners.component';
import { FooterComponent } from './footer/footer.component';
import { ArticlesComponent } from './articles/articles.component';
import { FrontComponent } from './front/front.component';
import { ArticleComponent } from './article/article.component';
import { GalleryComponent } from './gallery/gallery.component';

const routes: Routes = [{ path: '', component: FrontComponent}
, { path: 'Articles/:id', component: ArticleComponent}
, { path: 'Articles/:id/:name', component: ArticleComponent}
, { path: 'Articles', component: ArticlesComponent}
, { path: 'About', component: AboutComponent}
, { path: 'Search', component: SearchComponent}
, { path: 'Search/:queryString', component: SearchComponent}
, { path: '**', component: FrontComponent} // change this to 404
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
