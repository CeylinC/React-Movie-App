import "./MovieCard.css";
import { Card, ConfigProvider, theme } from "antd";
const { Meta } = Card;

interface IProp {
    name: string,
    year: string,
    imdb: string,
    img: string
}

function MovieCard({ name, year, imdb, img } : IProp) {
  return (
    <div className="movie-card">
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
        <span></span>
        <div className="imdb">
          {imdb}
        </div>
        <Card
        bordered={false}
        style={{ width: 240 }}
        cover={
          <img
            alt="Movie Poster"
            src={img}
          />
        }
      >
        <Meta title={name} description={year} />
      </Card>
      </ConfigProvider>
    </div>
  );
}

export default MovieCard;
