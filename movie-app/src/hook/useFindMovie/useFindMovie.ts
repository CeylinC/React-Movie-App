import { useEffect } from "react";
import { getMovie } from "../../service";
import { IMovie, IUser } from "../../model";

export const useFindMovie = (
  user: IUser | undefined,
  movieID: string,
  setFavorite: (isFavorite: boolean) => void,
  setMovie: (movie: IMovie) => void
) => {
  useEffect(() => {
    const findMovie = async () => {
      const movieData = await getMovie(movieID);
      if (movieData) {
        setMovie(movieData);
      }
    };
    findMovie();
    favoriteControl(user, movieID, setFavorite);
  }, []);
};

const favoriteControl = (
  user: IUser | undefined,
  movieID: string,
  setFavorite: (isFavorite: boolean) => void
) => {
  if (user) {
    if (user.favoriteMovies.length !== 0) {
      user.favoriteMovies.forEach((favoriteMovieID) => {
        if (favoriteMovieID === movieID) {
          setFavorite(true);
          return;
        }
      });
    }
  }
};
