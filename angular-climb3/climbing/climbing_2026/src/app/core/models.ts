export interface GalleryItem {
  file: string;
  description: string | null;
  descriptionEng: string | null;
  photographer: string | null;
  ratio: number | null;
}

export interface ArticleDetails {
  id: number;
  title: string;
  titleEng: string | null;
  writer: string | null;
  allurtexti: string;
  allurtextiEng: string | null;
  frettaritari: string | null;
  dagsetning: string | null;
  videoEmbed: string | null;
  videoLink: string | null;
  flightTrack: string | null;
  x: number | null;
  y: number | null;
  lat: number | null;
  lon: number | null;
  myndasida: GalleryItem[];
  tags: number[];
}

export interface ArticleSearchResult extends ArticleDetails {
  score: number;
}

export interface Tag {
  id: number;
  name: string;
  nameEnglish: string | null;
  checked?: boolean;
}

export interface SwLocation {
  isn93X: number;
  isn93Y: number;
}

export interface SearchResult {
  id: number;
  title: string;
  score: number;
}

export interface SearchData {
  joinResult: SearchResult[];
}

export interface AutoCompleteResult {
  score: number;
  word: string;
  importantCount: number;
}

export interface AllData {
  articles: ArticleDetails[];
  tags: Tag[];
}
