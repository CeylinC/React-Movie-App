import { IMovie } from "../interface";

export class Movie implements IMovie{
    id: string;
    name: string;
    year: number;
    imdb: number;
    poster: string;
    category: string;
    directors: string;
    stars: string;
    duration: string;
    writers: string;
    background: string;
    description: string;

    constructor(data?: any){
        this.id = data?.id || ""
        this.name = data?.name || "none"
        this.year = data?.year || 0
        this.imdb = data?.imdb || 0
        this.poster = data?.poster || ""
        this.category = data?.category || "unspecified"
        this.directors = data?.directors || "none"
        this.stars = data?.stars || "none"
        this.duration = data?.duration || "none"
        this.writers = data?.writers || "none"
        this.background = data?.background || ""
        this.description = data?.description || "no description"
    }
}