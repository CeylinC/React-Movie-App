import './MovieCardSection.css';
import { MovieCard } from '../../components';
import { useMoviesStore } from '../../state';

interface IProp {
  filter: string;
  search?: string;
}

export function MovieCardSection({ filter, search }: IProp,) {
  const moviesList = useMoviesStore((state) => state.movies)
  return (
    <div className="movie-card-section">
      <div className="movie-card-list">
        {
          !search ?
            filter === "all" ?
              moviesList.map((movie) => {
                return (
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
              return (
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
