import { create } from "zustand";
import { IMovie, ISortSelector, IUser } from "../../model";
import {
  getData,
  getFirstQuery,
  getMovieData,
  getNextQuery,
} from "../../service";

interface MovieState {
  movies: IMovie[];
  addMovie: (movie: IMovie) => void;
  clearMovies: () => void;
  fetchMoreData: (
    moviesCount: number,
    setHasMore: (value: boolean) => void,
    sort?: ISortSelector
  ) => void;
  getFirstData: (sort?: ISortSelector) => void;
  getUserFavoriteMovies: (user: IUser | undefined) => void;
}

export const useMoviesStore = create<MovieState>((set) => ({
  movies: [],
  addMovie: (movie: IMovie) => {
    set((state) => ({
      movies: [
        ...state.movies.filter((stateMovie) => stateMovie.id !== movie.id),
        movie,
      ],
    }));
  },
  clearMovies: () => set({ movies: [] }),
  fetchMoreData: async (
    moviesCount: number,
    setHasMore: (value: boolean) => void,
    sort?: ISortSelector
  ) => {
    const movieQuery = await getNextQuery(
      sort || { sort: "name", order: "asc" }
    );
    let movieData = await getData(movieQuery, sort?.sort || "name");
    set((state) => {
      if (state.movies.length >= moviesCount) {
        setHasMore(false);
      }
      return {
        movies: [...state.movies, ...movieData],
      };
    });
  },
  getFirstData: async (sort?: ISortSelector) => {
    const firstQuery = await getFirstQuery(
      sort || { sort: "name", order: "asc" }
    );
    const movies = await getData(firstQuery, sort?.sort || "name");
    set((state) => ({
      movies: [...state.movies, ...movies],
    }));
  },
  getUserFavoriteMovies: (user: IUser | undefined) => {
    if (user) {
      if (user.favoriteMovies.length !== 0) {
        user.favoriteMovies.forEach(async (movieId) => {
          let movie = await getMovieData(movieId);
          if (movie) {
            set((state) => ({ movies: [...state.movies, movie!] }));
          }
        });
      }
    }
  },
}));
