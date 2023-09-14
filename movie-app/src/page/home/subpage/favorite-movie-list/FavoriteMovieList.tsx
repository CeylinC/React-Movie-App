import { useEffect } from "react";
import { MovieCardSection } from "../../../../feature";
import { getMovieData } from "../../../../service";
import { useMoviesStore, useUserStore } from "../../../../hook";

export function FavoriteMovieList() {
  const { addMovie, clearMovies } = useMoviesStore();
  const { user } = useUserStore();

  const findFavoriteMovies = () => {
    clearMovies();
    if (user) {
      if (user.favoriteMovies.length !== 0) {
        user.favoriteMovies.forEach(async (movieId) => {
          let movie = await getMovieData(movieId);
          if (movie) {
            addMovie(movie);
          }
        });
      }
    }
  };

  useEffect(() => {
    if (user) {
      findFavoriteMovies();
    }
  }, [user]);

  return (
    <div className="movie-list">
      <MovieCardSection filter="all" />
    </div>
  );
}
