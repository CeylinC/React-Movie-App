import React from 'react';
import './App.css';
import Navbar from './components/navbar/Navbar';
import Selector from './components/selector/Selector';
import MovieCardSection from './components/movie-card-section/MovieCardSection';

function App() {
  return (
    <div className="App">
    <Navbar />
    {/* <Selector placeholder="Sort By : "
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
          ]} /> */}
    <MovieCardSection/>
    </div>
  );
}

export default App;
