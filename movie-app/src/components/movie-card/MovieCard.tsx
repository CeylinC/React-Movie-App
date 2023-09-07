import { IMovie } from "../../model";
import "./MovieCard.css";
import { Card, ConfigProvider, theme } from "antd";
const { Meta } = Card;

interface IProp{
  movie : IMovie
}

export function MovieCard({ movie : {name, year, imdb, poster} } : IProp) {
  return (
    <div className="movie-card" title={name}>
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
          {imdb}
        </div>
        <Card
        bordered={false}
        cover={
          <img
            alt="Movie Poster"
            src={poster}
          />
        }
      >
        <Meta title={name} description={year} />
      </Card>
      </ConfigProvider>
    </div>
  );
}
