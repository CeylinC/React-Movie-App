import { IMovie } from "../model";
import { getMovieData } from "../service";

export const findMovie = async (
  movieID: string,
  setMovie: (movie: IMovie) => void
) => {
  const movieData = await getMovieData(movieID);
  if (movieData) {
    setMovie(movieData);
  }
};
