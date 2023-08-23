import React, { useEffect, useState } from 'react';
import './Homepage.css';
import Selector from '../../components/selector/Selector';
import MovieCardSection from '../../components/movie-card-section/MovieCardSection';
import {nextQuery, getData, firstQuery, searchQuery} from '../../service/Post';
import { useMoviesStore } from '../../state/Movies';
import InfiniteScroll from 'react-infinite-scroll-component';
import { ISortSelector } from '../../interface/ISortSelector';
import { useSearchParams } from 'react-router-dom';
import Navbar from '../../components/navbar/Navbar';

function Homepage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentParams = Object.fromEntries([...searchParams]);
  const { movies, addMovie, clearMovies } = useMoviesStore();
  const [filter, setFilter] = useState<string>(currentParams.filter !== undefined ? currentParams.filter : "all");
  const [sort, setSort] = useState<ISortSelector>({sort: currentParams.sort !== undefined ? currentParams.sort : "name", order: currentParams.order === "asc" || currentParams.order === "desc" ? currentParams.order : "asc"});
  const [hasMore, setHasMore] = useState(true);
  const [search, setSearch] = useState<string>("");

  const fetchMoreData = () => {
    const getMovieData = async() => {
      let data = await getData(await nextQuery(sort), sort.sort);
      data.forEach(a => addMovie(a));
    }
    getMovieData();
    if (movies.length >= 50) {
      setHasMore(false);
    }
  }

  const getFirstMovieData = () => {
    const getMovieData = async () => {
      let movieList = await getData(await firstQuery(sort), sort.sort);
      movieList.forEach(movie => addMovie(movie));
    }
    getMovieData();
  }

  const changeSort = (value: string) => {
    clearMovies();
    switch(value){
      case "az":
        setSort({sort: "name", order: "asc"});
        break;
      case "za":
        setSort({sort: "name", order: "desc"});
        break;
      case "latest":
        setSort({sort: "year", order: "desc"});
        break;
      case "oldest":
        setSort({sort: "year", order: "asc"});
        break;
      default:
        setSort({sort: "name", order: "asc"});
        break;
    }
  }

  useEffect(() => {
    setSearchParams({filter: filter, sort: sort.sort, order: sort.order});
    getFirstMovieData();
  }, [sort]);
  
  useEffect(() => setSearchParams({filter: filter, sort: sort.sort, order: sort.order}), [filter]);

  useEffect(() => {
    clearMovies();
    const searchMovie = async () => {
      const movieList = await getData(await searchQuery(search), "name");
      movieList.forEach((movie) => addMovie(movie));
    }
    if(search.length !== 0){
      searchMovie();
      setSearchParams({search: search});
    }
  }, [search]);

  return (
    <div className="Homepage">
      <Navbar setSearch={setSearch} />
      {
        search.length === 0 ?
        <>
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
          defaultValue={
              sort.order === "desc" ? (sort.sort === "name" ? "Z - A" : "Latest") : (sort.sort === "name" ? "A - Z": "Oldest")
          }
          onChange={(value) => changeSort(value)}
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
            defaultValue={filter}
            onChange={(value) => setFilter(value)}
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
        </>
      :
      <MovieCardSection filter='all'/>
      }
    </div>
  );
}

export default Homepage;
