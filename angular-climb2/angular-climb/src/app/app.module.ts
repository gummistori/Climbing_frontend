import { NavComponent } from './nav/nav.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent, SafePipe } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { DataService } from './data.service';
import { AboutComponent } from './about/about.component';
import { BannersComponent } from './banners/banners.component';
import { FooterComponent } from './footer/footer.component';
import { ArticlesComponent } from './articles/articles.component';
import { FrontComponent } from './front/front.component';
import { ArticleComponent } from './article/article.component';
import { GalleryComponent } from './gallery/gallery.component';
import { EpochDatePipe } from './epoch-date.pipe';
import { ArticlesRandomImageComponent } from './articles.random.image/articles.random.image.component';
import { SearchComponent } from './search/search.component';
import { GalleryImageComponent } from './gallery.image/gallery.image.component';
import { ArticleVideoComponent } from './article.video/article.video.component';
import { ClimbingsearchComponent } from './climbingsearch/climbingsearch.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    AboutComponent,
    BannersComponent,
    FooterComponent,
    ArticlesComponent,
    FrontComponent,
    ArticleComponent,
    GalleryComponent,
    EpochDatePipe,
    ArticlesRandomImageComponent,
    SearchComponent,
    GalleryImageComponent,
    ArticleVideoComponent,
    SafePipe,
    ClimbingsearchComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatFormFieldModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
