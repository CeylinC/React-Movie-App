import { BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import './App.css';
import Navbar from './components/navbar/Navbar';
import Homepage from './page/Homepage/Homepage';
import { useEffect, useState } from 'react';
import { getData, searchQuery } from './service/Post';
import { useMoviesStore } from './state/Movies';
import Searchpage from './page/Searchpage/Searchpage';

function App() {
  const [search, setSearch] = useState<string>("");
  const { clearMovies, addMovie} = useMoviesStore();

  useEffect(() => {
    clearMovies();
    const searchMovie = async () => {
      const movies = await getData(await searchQuery(search), "name");
      movies.forEach((movie) => addMovie(movie));
    }
    if(search.length !== 0){
      searchMovie();
    }
  }, [search]);

  return (
    <div className="App">
      <Navbar setSearch={setSearch} />
      <Router>
      <Routes>
        <Route path='/' element={search === "" ? <Homepage /> : <Searchpage search={search} />} />
      </Routes>
      </Router>
    </div>
  );
}

export default App;
