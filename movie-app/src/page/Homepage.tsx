import React, { useEffect, useState } from 'react';
import './Homepage.css';
import Navbar from '../components/navbar/Navbar';
import Selector from '../components/selector/Selector';
import MovieCardSection from '../components/movie-card-section/MovieCardSection';
import {nextQuery, getData, firstQuery} from '../service/Post';
import { useMoviesStore } from '../state/Movies';
import InfiniteScroll from 'react-infinite-scroll-component';
import { ISortSelector } from '../interface/ISortSelector';

function Homepage() {
  const { movies, addMovie, clearMovies } = useMoviesStore();
  const [filter, setFilter] = useState<string>("all");
  const [sort, setSort] = useState<ISortSelector>({sortType: "name", sortDirection: "asc"});
  const [hasMore, setHasMore] = useState(true);

  const fetchMoreData = () => {
    const getMovieData = async() => {
      let data = await getData(await nextQuery(sort));
      data.forEach(a => addMovie(a));
    }
    getMovieData();
    if (movies.length >= 50) {
      setHasMore(false);
    }
  };

  const getFirstMovieData = () => {
    const getMovieData = async () => {
      let movieList = await getData(await firstQuery(sort));
      movieList.forEach(movie => addMovie(movie));
    }
    getMovieData();
  }

  const changeSort = (value: string) : ISortSelector => {
    clearMovies();
    switch(value){
      case "a - z":
        return {sortType: "name", sortDirection: "asc"};
      case "z - a":
        return {sortType: "name", sortDirection: "desc"};
      case "latest":
        return {sortType: "year", sortDirection: "desc"};
      case "oldest":
        return {sortType: "year", sortDirection: "asc"};
      default:
        return {sortType: "name", sortDirection: "asc"};
    }
  }

  useEffect(() => {
    getFirstMovieData();
  }, []);

  return (
    <div className="Homepage">
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
        onChange={(value) => setSort(changeSort(value))}
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
            {
              value: "horror",
              label: "Horror",
            },
            {
              value: "romantic",
              label: "Romantic",
            },
            
          ]}
          onChange={(value) => setFilter(value) }
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

export default Homepage;
