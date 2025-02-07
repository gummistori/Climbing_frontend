import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DataService } from './data.service';
import { AboutComponent } from './about/about.component';
import { BannersComponent } from './banners/banners.component';
import { FooterComponent } from './footer/footer.component';
import { ArticlesComponent } from './articles/articles.component';
import { FrontComponent } from './front/front.component';
import { ArticleComponent } from './article/article.component';
import { GalleryComponent } from './gallery/gallery.component';
import { ArticlesRandomImageComponent } from './articles.random.image/articles.random.image.component';
import { SearchComponent } from './search/search.component';
import { GalleryImageComponent } from './gallery.image/gallery.image.component';
import { ArticleVideoComponent } from './article.video/article.video.component';
import { ClimbingsearchComponent } from './climbingsearch/climbingsearch.component';
import { VideosComponent } from './videos/videos.component';
import { VideoListComponent } from './video-list/video-list.component';
import { VideoPlayerComponent } from './video-player/video-player.component';
import { VideoThumbnailComponent } from './video-thumbnail/video-thumbnail.component';
import { NavComponent } from './nav/nav.component';
import { EpochDatePipe } from './epoch-date.pipe';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatChipsModule } from '@angular/material/chips';
import { LocationComponent } from './location/location.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';

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
    ArticlesRandomImageComponent,
    SearchComponent,
    GalleryImageComponent,
    ArticleVideoComponent,
    EpochDatePipe,
    // SafePipe,
    ClimbingsearchComponent,
    VideosComponent,
    VideoListComponent,
    VideoPlayerComponent,
    VideoThumbnailComponent,
    LocationComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatChipsModule,
    HttpClientModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
