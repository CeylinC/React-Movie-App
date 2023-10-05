import { MovieCard } from "../../components";
import { useMoviesStore } from "../../hook";

interface IProp {
  filter: string;
  search?: string | null;
}

export function MovieCardSection({ filter, search }: IProp) {
  const moviesList = useMoviesStore((state) => state.movies);
  return (
    <div className="movie-card-section w-full flex items-center flex-col">
      <div className="movie-card-list flex flex-wrap justify-center mb-12">
        {search
          ? moviesList
              .filter((movie) =>
                movie.name.toLowerCase().includes(search.toLowerCase())
              )
              .map((movie) => {
                return <MovieCard movie={movie} key={movie.id} />;
              })
          : filter === "all"
          ? moviesList.map((movie) => {
              return <MovieCard movie={movie} key={movie.id} />;
            })
          : moviesList
              .filter((movie) => movie.category === filter)
              .map((movie) => <MovieCard movie={movie} key={movie.id} />)}
      </div>
    </div>
  );
}
