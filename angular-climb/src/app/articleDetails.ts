import { GalleryItem } from './galleryItem';

export interface ArticleDetails {
    id: number;
    title: string;
    titleEng: string;
    writer: string;
    allurtexti: string;
    allurtextiEng: string;
    frettaritari: string;
    dagsetning: string;
    videoEmbed: string;
    flightTrack: string;
    x: number;
    y: number;
    lat: number;
    lon: number;
    myndasida: GalleryItem[];
    tags: number[];
}

export function getRandomImage(value: GalleryItem[]): string {
    const items: string[] = [];
    for (let i = 0; i < value.length; i++) {
        if (value[i].ratio > 1.4) {
            items.push(value[i].file);
        }
    }

    if (items.length === 0) {
        return null;
    }

    const image = items[ Math.floor(Math.random() * Math.floor(items.length))];
    return image; // "Nepal_24e.jpg";
}
