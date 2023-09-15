import { IMovie } from "../model";
import { getMovieData } from "../service";

export const findMovie = (
  movieID: string,
  setMovie: (movie: IMovie) => void
) => {
  const getMovie = async () => {
    const movieData = await getMovieData(movieID);
    if (movieData) {
      setMovie(movieData);
    }
  };
  getMovie();
};
