import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Video } from '../Models/videos';

@Component({
  selector: 'video-list',
  templateUrl: './video-list.component.html',
  styleUrls: ['./video-list.component.css']
})
export class VideoListComponent {
  @Input() videoData!: Video[];
  @Output() selectVideo = new EventEmitter<Video>();

  currentVideo: Video | undefined;

  setCurrentVideo(video: Video) {
    console.log(video);
    this.currentVideo = video;
    this.selectVideo.emit(video);
  }

}
