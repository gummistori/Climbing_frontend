import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Video } from '../Models/videos';

@Component({
  selector: 'video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.css']
})
export class VideoPlayerComponent {


  private theVideo!: Video;

  // Create a trusted version of the video URL each time
  // the input video changes.
  //
  @Input() set video(value: Video) {
    this.theVideo = value;
    console.log('hit');
    if (value && value.link) {
      this.videoUrl = this.domSanitizer.bypassSecurityTrustResourceUrl(
        value.link
      );
    }
  }

  get video() { return this.theVideo; }

  videoUrl: SafeUrl | undefined;

  constructor(private domSanitizer: DomSanitizer) { }
}
