import { IMovie, IUser } from "../model";
import { getMovieData } from "../service";
import { favoriteControl } from "./favoriteControl";

export const findMovie = (
  user: IUser | undefined,
  movieID: string,
  setFavorite: (isFavorite: boolean) => void,
  setMovie: (movie: IMovie) => void
) => {
  const getMovie = async () => {
    const movieData = await getMovieData(movieID);
    if (movieData) {
      setMovie(movieData);
    }
  };
  getMovie();
  favoriteControl(user, movieID, setFavorite);
};
