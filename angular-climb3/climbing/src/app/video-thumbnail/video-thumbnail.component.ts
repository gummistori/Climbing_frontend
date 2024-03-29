import { Component, Input, OnInit } from '@angular/core';
import { Video } from '../Models/videos';

@Component({
  selector: 'video-thumbnail',
  templateUrl: './video-thumbnail.component.html',
  styleUrls: ['./video-thumbnail.component.css']
})
export class VideoThumbnailComponent implements OnInit {
  @Input() video!: Video;

  constructor() { }

  ngOnInit(): void {
  }

}
