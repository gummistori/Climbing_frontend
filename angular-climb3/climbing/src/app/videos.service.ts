import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { Video } from './Models/videos';

const videoBaseUrl = 'https://vimeo.com/';

export const videos: Video[] = [
  { title: 'Yfir Langjökul',
    author: 'Fjallateymið',
    id: '547276237',
    thumb: ''
  },
  { 
    title: 'Skessuhorn, climb and fly',
    author: 'Fjallateymið',
    id: '499203466',
    thumb: ''
  },
  { 
    title: 'Eyjafjallajökull, hike and fly',
    author: 'Fjallateymið',
    id: '323590224',
    thumb: ''
  }
];

function addVideoUrl(items: Video[], endpoint: string): Video[] {
  return items.map((itemInfo: Video) => ({
    ...itemInfo, videoUrl: videoBaseUrl + '/' + itemInfo.id
  }));
}

@Injectable({
  providedIn: 'root'
})
export class VideosService {
  

// Generate a videoUrl property for each item
// by combining the base URL with the video ID.

  load(endpoint: number): Observable<Video[]> {
    return of(videos[endpoint]).pipe(
      map((allItems: any) => addVideoUrl(allItems, endpoint.toString()))
    );
  }
}
