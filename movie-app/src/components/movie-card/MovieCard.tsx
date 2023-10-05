import { Link } from "react-router-dom";
import { IMovie } from "../../model";
import "./MovieCard.css";
import { Card, ConfigProvider, theme } from "antd";
const { Meta } = Card;

interface IProp {
  movie: IMovie;
}

export function MovieCard({ movie }: IProp) {
  return (
    <Link
      to={`/movie?id=${movie.id}`}
      className="movie-card relative inline-block no-underline cursor-pointer m-2"
      title={movie.name}
    >
      <ConfigProvider
        theme={{
          algorithm: theme.darkAlgorithm,
          components: {
            Card: {
              algorithm: true,
              colorTextDescription: "#FFD369",
              paddingLG: 15,
              colorBgContainer: "#222831",
              borderRadius: 0,
            },
          },
        }}
      >
        <div className="imdb w-6 h-6 text-center p-1 text-white inline absolute rounded-full top-3.5 right-3.5 z-50">
          {movie.imdb}
        </div>
        <Card
          bordered={false}
          cover={<img alt="Movie Poster" src={movie.poster} className="object-cover w-full"/>}
          className="w-60"
        >
          <Meta title={movie.name} description={movie.year} />
        </Card>
      </ConfigProvider>
    </Link>
  );
}
