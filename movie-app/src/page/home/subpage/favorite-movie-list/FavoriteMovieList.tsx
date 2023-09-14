import { useEffect } from "react";
import { MovieCardSection } from "../../../../feature";
import { getMovieData } from "../../../../service";
import { useUserControl, useMoviesStore, useUserStore } from "../../../../hook";

export function FavoriteMovieList() {
  const { addMovie, clearMovies } = useMoviesStore();
  const { user, setUser } = useUserStore();

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

  useUserControl(user, setUser);

  useEffect(() => {
    findFavoriteMovies();
  }, []);

  return (
    <div className="favorite-movie-list">
      {<MovieCardSection filter="all" />}
    </div>
  );
}
