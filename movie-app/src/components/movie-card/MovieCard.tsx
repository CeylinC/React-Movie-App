import { Link } from "react-router-dom";
import { IMovie } from "../../model";
import "./MovieCard.css";
import { Card, ConfigProvider, theme } from "antd";
const { Meta } = Card;

interface IProp{
  movie : IMovie
}

export function MovieCard({ movie } : IProp) {
  return (
    <Link to={`/movie?id=${movie.id}`} className="movie-card" title={movie.name}>
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
        <div className="imdb">
          {movie.imdb}
        </div>
        <Card
        bordered={false}
        cover={
          <img
            alt="Movie Poster"
            src={movie.poster}
          />
        }
      >
        <Meta title={movie.name} description={movie.year} />
      </Card>
      </ConfigProvider>
    </Link>
  );
}
