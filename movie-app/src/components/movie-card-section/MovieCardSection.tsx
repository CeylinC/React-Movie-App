import React from 'react';
import './MovieCardSection.css';
import MovieCard from '../movie-card/MovieCard';
import { useMoviesStore } from '../../state/Movies';

interface IProp{
  filter: string;
  search ?: string;
}

function MovieCardSection({ filter, search } : IProp,) {
  const moviesList = useMoviesStore((state) => state.movies)
  return (
    <div className="movie-card-section">
      <div className="movie-card-list">
          {
            !search ?
            filter === "all" ?
            moviesList.map((movie) => {
              return(
                <MovieCard
                  movie={movie}
                  key={movie.id}
                />
              );
            })
            :
            moviesList.filter(movie => movie.category === filter).map((movie) => 
                <MovieCard
                  movie={movie}
                  key={movie.id}
                />
            )
          :
            moviesList.filter(movie => movie.name.includes(search)).map((movie) => {
              return(
                <MovieCard
                  movie={movie}
                  key={movie.id}
                />
              )
            })
          }
      </div>
    </div>
  );
}

export default MovieCardSection;
