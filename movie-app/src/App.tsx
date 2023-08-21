import React, { useEffect, useState } from 'react';
import './App.css';
import Navbar from './components/navbar/Navbar';
import Selector from './components/selector/Selector';
import MovieCardSection from './components/movie-card-section/MovieCardSection';
import {nextQuery, getData, firstQuery} from './service/Post';
import { useMoviesStore } from './state/Movies';
import InfiniteScroll from 'react-infinite-scroll-component';

function App() {
  const { movies, addMovie } = useMoviesStore();
  const [filter, setFilter] = useState<string>("all");
  const [hasMore, setHasMore] = useState(true);

  const fetchMoreData = () => {
    const getMovieData = async() => {
      let data = await getData(await nextQuery());
      data.forEach(a => addMovie(a));
    }
    getMovieData();
    if (movies.length >= 20) {
      setHasMore(false);
    }
  };

  useEffect(() => {
    const getMovieData = async () => {
      let movieList = await getData(await firstQuery());
      movieList.forEach(movie => addMovie(movie));
    }
  getMovieData();
  }, []);

  return (
    <div className="App">
    <Navbar />
    <div className="sort-filter-menu">
      <div className="sort-menu">
      <Selector placeholder="Sort By : "
        options={[
          {
            value: "az",
            label: "A - Z",
          },
          {
            value: "za",
            label: "Z - A",
          },
          {
            value: "latest",
            label: "Latest",
          },
          {
            value: "oldest",
            label: "Oldest",
          },
        ]}
        onChange={() => {}}
      />
      </div>
      <div className="filter-menu">
        <Selector placeholder="Filter By : "
          options={[
            {
              value: "all",
              label: "All",
            },
            {
              value: "action",
              label: "Action",
            },
            {
              value: "comedy",
              label: "Comedy",
            },
            {
              value: "animation",
              label: "Animation",
            },
          ]}
          onChange={(value) => { setFilter(value); console.log(value)}}
        />
      </div>
    </div>
    <InfiniteScroll
      dataLength={movies.length}
      next={fetchMoreData}
      hasMore={hasMore}
      loader={<h4>Loading...</h4>}
      endMessage={<p>No more items to load</p>}
    >
    <MovieCardSection filter={filter}/>
    </InfiniteScroll>
    </div>
  );
}

export default App;
