import { useEffect } from "react";
import { MovieCardSection } from "../../../../feature";
import { useMoviesStore, useUserStore } from "../../../../hook";
import { useNavigate } from "react-router-dom";

export default function FavoriteMovieList() {
  const { getUserFavoriteMovies, clearMovies } = useMoviesStore();
  const { user } = useUserStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      clearMovies();
      getUserFavoriteMovies(user);
    } else {
      navigate("/log-in");
    }
  }, [user]);

  return (
    <div className="movie-list">
      <MovieCardSection filter="all" />
    </div>
  );
}
