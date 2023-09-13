import { useEffect, useState } from "react";
import { useMoviesStore } from "../../../../state";
import { MovieCardSection } from "../../../../feature";
import { IUser } from "../../../../model";
import { getUser } from "../../../../util";
import { getMovie } from "../../../../service";

export function FavoriteMovieList() {
    const {addMovie, clearMovies} = useMoviesStore();
    const user: IUser = getUser();

    const findFavoriteMovies = () => {
        clearMovies();
        if(user.favoriteMovies.length !== 0){
            user.favoriteMovies.forEach(async (movieId) => {
                let movie = await getMovie(movieId);
                if(movie){
                    addMovie(movie);
                }
            })
        }
    }

    useEffect(() => {
        findFavoriteMovies();
    },[]);

    return (
        <div className="favorite-movie-list">
            {
                <MovieCardSection filter='all' />
            }
        </div>
    );
}