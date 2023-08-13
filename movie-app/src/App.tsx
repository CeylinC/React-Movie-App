import React, { useEffect, useState } from 'react';
import './App.css';
import Navbar from './components/navbar/Navbar';
import Selector from './components/selector/Selector';
import MovieCardSection from './components/movie-card-section/MovieCardSection';
import getData from './service/firebase';
import { useMoviesStore } from './state/Movies';

function App() {
  const { movies, addMovie} = useMoviesStore();
  const [filter, setFilter] = useState<string>("all");

  useEffect(() => {
    const getMovieData = async () => {
      addMovie(await getData());
      console.log("a");
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
    <MovieCardSection filter={filter}/>
    </div>
  );
}

export default App;
