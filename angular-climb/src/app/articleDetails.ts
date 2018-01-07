import { GalleryItem } from './galleryItem';

export interface ArticleDetails {
    id: number;
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
}
