import { GalleryItem } from './galleryItem';

export interface ArticleDetails {
    fyrirsogn: string;
    fyrirsognEng: string;
    body: string;
    bodyEng: string;
    myndasida: number;
    frettaritari: string;
    dagsetning: string;
    videoEmbed: string;
    flightTrack: string;
    x: number;
    y: number;
    lat: number;
    lon: number;
    gallery: GalleryItem[];
};

export function getRandomImage(value: GalleryItem[]): string{
    console.log(value);
    var item: string[] = [];
    for (var i = 0; i < value.length; i++){
        if (value[i].ratio > 1.4){
            item.push(value[i].file);
        }
    }

    return item[ Math.floor(Math.random() * Math.floor(item.length))] ; // "Nepal_24e.jpg";
};