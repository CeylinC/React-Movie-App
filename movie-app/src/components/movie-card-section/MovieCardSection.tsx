import React from 'react';
import './MovieCardSection.css';
import MovieCard from '../movie-card/MovieCard';
import { ConfigProvider, Pagination, theme } from 'antd';

function MovieCardSection() {
  return (
    <div className="movie-card-section">
      <div className="movie-card-list">
          <MovieCard name="Movie Name" year='0000' imdb='0.0' img='https://lumiere-a.akamaihd.net/v1/images/p_avengersendgame_19751_e14a0104.jpeg?region=0%2C0%2C540%2C810'/>
          <MovieCard name="Movie Name" year='0000' imdb='0.0' img='https://lumiere-a.akamaihd.net/v1/images/p_avengersendgame_19751_e14a0104.jpeg?region=0%2C0%2C540%2C810'/>
          <MovieCard name="Movie Name" year='0000' imdb='0.0' img='https://lumiere-a.akamaihd.net/v1/images/p_avengersendgame_19751_e14a0104.jpeg?region=0%2C0%2C540%2C810'/>
          <MovieCard name="Movie Name" year='0000' imdb='0.0' img='https://lumiere-a.akamaihd.net/v1/images/p_avengersendgame_19751_e14a0104.jpeg?region=0%2C0%2C540%2C810'/>
          <MovieCard name="Movie Name" year='0000' imdb='0.0' img='https://lumiere-a.akamaihd.net/v1/images/p_avengersendgame_19751_e14a0104.jpeg?region=0%2C0%2C540%2C810'/>
          <MovieCard name="Movie Name" year='0000' imdb='0.0' img='https://lumiere-a.akamaihd.net/v1/images/p_avengersendgame_19751_e14a0104.jpeg?region=0%2C0%2C540%2C810'/>
          <MovieCard name="Movie Name" year='0000' imdb='0.0' img='https://lumiere-a.akamaihd.net/v1/images/p_avengersendgame_19751_e14a0104.jpeg?region=0%2C0%2C540%2C810'/>
          <MovieCard name="Movie Name" year='0000' imdb='0.0' img='https://lumiere-a.akamaihd.net/v1/images/p_avengersendgame_19751_e14a0104.jpeg?region=0%2C0%2C540%2C810'/>
          <MovieCard name="Movie Name" year='0000' imdb='0.0' img='https://lumiere-a.akamaihd.net/v1/images/p_avengersendgame_19751_e14a0104.jpeg?region=0%2C0%2C540%2C810'/>
          <MovieCard name="Movie Name" year='0000' imdb='0.0' img='https://lumiere-a.akamaihd.net/v1/images/p_avengersendgame_19751_e14a0104.jpeg?region=0%2C0%2C540%2C810'/>
      </div>
      <ConfigProvider
        theme={{
          algorithm: theme.darkAlgorithm,
          components: {
            Pagination: {
              itemActiveBg: "#ffc32c",
              colorPrimary: "fff",
              colorPrimaryHover: "fff",
            }
          }
        }}
        >
        <Pagination defaultCurrent={1} total={50} className='pagination'/>
      </ConfigProvider>
    </div>
  );
}

export default MovieCardSection;
