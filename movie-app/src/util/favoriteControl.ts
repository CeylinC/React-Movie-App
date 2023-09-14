import { IUser } from "../model";

export const favoriteControl = (
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