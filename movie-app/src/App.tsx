import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import * as page from './page';

function App() {

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<page.Homepage />} >
            <Route path='/favorite' element={<page.FavoriteMovieList />}/>
            <Route path='/movie' element={<page.MovieDetail />}/>
            <Route path='/' element={<page.HomepageMovieList />}/>
          </Route>
          <Route path='/admin' element={<page.Adminpage />}>
            <Route path="/admin/movie-list" element={<page.MovieListpage />} />
            <Route path="/admin/add-movie" element={<page.AddMoviepage />} />
          </Route>
          <Route path='/log-in' element={<page.LogInpage />} />
          <Route path='/sign-up' element={<page.SignUppage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;