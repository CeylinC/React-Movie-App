import { create } from "zustand";
import { IMovie } from "../interface/IMovie";

interface MovieState {
    movies: IMovie[];
    addMovie: (movie: IMovie) => void;
    clearMovies: () => void;
}

export const useMoviesStore = create<MovieState>((set) => ({
    movies: [],
    addMovie: (movie: IMovie) => set((state) => ({
        movies: [...state.movies, movie]
    })),
    clearMovies: () => set(() => ({
        movies: []
    }))
}));