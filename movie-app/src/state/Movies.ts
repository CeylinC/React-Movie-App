import { create } from "zustand";
import { IMovie } from "../interface/IMovie";

interface MovieState {
    movies: IMovie[];
    addMovie: (movie: IMovie[]) => void;
}

export const useMoviesStore = create<MovieState>((set) => ({
    movies: [],
    addMovie: (movieList: IMovie[]) => set((state) => ({
        movies: movieList
    })),
}));