export interface Searchresult {
    id: number;
    title: string;
    score: number;
}

export interface SearchData {
    joinResult: Searchresult[];
}