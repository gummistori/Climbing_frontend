import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Video } from '../Models/videos';
import { VideosService } from '../videos.service';

@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.css']
})
export class VideosComponent {

  currentVideo: Video | undefined;

  videosObservable: Observable<Video[]> | undefined;


  setCurrentVideo(v: Video) {
    this.currentVideo = v;
  }

  constructor(svc: VideosService) {
    this.videosObservable = svc.load(0);// 'misc');
  }

}
